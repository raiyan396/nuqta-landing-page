const STRIPE_API_URL = "https://api.stripe.com/v1/checkout/sessions";
const ALLOWED_FREQUENCIES = new Set(["one-time", "monthly"]);
const MIN_AMOUNT_USD = 1;
const MAX_AMOUNT_USD = 10000;

function getBaseUrl(req) {
    if (process.env.SITE_URL) {
        return process.env.SITE_URL.replace(/\/$/, "");
    }

    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;

    return `${protocol}://${host}`;
}

function getRequestBody(req) {
    if (!req.body) {
        return {};
    }

    if (typeof req.body === "string") {
        try {
            return JSON.parse(req.body);
        } catch {
            return {};
        }
    }

    return req.body;
}

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed." });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({
            error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel.",
        });
    }

    const body = getRequestBody(req);
    const frequency = body.frequency;
    const amount = Number.parseInt(body.amount, 10);

    if (!ALLOWED_FREQUENCIES.has(frequency)) {
        return res.status(400).json({ error: "Unsupported donation frequency." });
    }

    if (
        !Number.isInteger(amount) ||
        amount < MIN_AMOUNT_USD ||
        amount > MAX_AMOUNT_USD
    ) {
        return res.status(400).json({
            error: `Donation amount must be between $${MIN_AMOUNT_USD} and $${MAX_AMOUNT_USD}.`,
        });
    }

    const baseUrl = getBaseUrl(req);
    const successUrl = new URL("/support/", baseUrl);
    successUrl.searchParams.set("donation", "success");
    successUrl.searchParams.set("frequency", frequency);
    successUrl.searchParams.set("amount", String(amount));

    const cancelUrl = new URL("/support/", baseUrl);
    cancelUrl.searchParams.set("donation", "cancel");

    const amountInCents = amount * 100;
    const isMonthly = frequency === "monthly";
    const params = new URLSearchParams({
        mode: isMonthly ? "subscription" : "payment",
        success_url: successUrl.toString(),
        cancel_url: cancelUrl.toString(),
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][unit_amount]": String(amountInCents),
        "line_items[0][price_data][product_data][name]": isMonthly
            ? "Monthly donation"
            : "One-time donation",
        "line_items[0][price_data][product_data][description]":
            "Support nuqta.'s mission.",
    });

    if (isMonthly) {
        params.set("line_items[0][price_data][recurring][interval]", "month");
    }

    try {
        const stripeResponse = await fetch(STRIPE_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        const payload = await stripeResponse.json();

        if (!stripeResponse.ok || !payload.url) {
            const message =
                payload?.error?.message ||
                "Stripe could not create a checkout session.";
            return res.status(500).json({ error: message });
        }

        return res.status(200).json({ url: payload.url });
    } catch {
        return res.status(500).json({
            error: "Unable to reach Stripe right now. Please try again.",
        });
    }
};
