(function (global) {
    "use strict";

    const RECURRING_TYPES = new Set(["recurring"]);
    const PLACEHOLDER_IMAGE = "../assets/images/what-is-nuqta/suhbah.png";

    const PROGRAMS_QUERY = `*[
        _type == "program" &&
        !(_id in path("drafts.**"))
    ]{
        _id,
        title,
        "slug": slug.current,
        programType,
        "flyerImageUrl": flyerImage.asset->url,
        "flyerImageAlt": coalesce(flyerImage.alt, title),
        startDate,
        endDate,
        expiresAt,
        registrationDeadline,
        location,
        audience,
        fee,
        summary,
        description,
        partners,
        givebutterUrl,
        ctaLabel,
        isPublished,
        featured
    }`;

    function parseDate(value) {
        if (!value) return null;
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    function getExpiryDate(program) {
        return (
            parseDate(program.expiresAt) ||
            parseDate(program.endDate) ||
            parseDate(program.startDate)
        );
    }

    function isRecurringProgram(program) {
        return RECURRING_TYPES.has(program.programType);
    }

    function isExpired(program, now = new Date()) {
        const expiry = getExpiryDate(program);
        return Boolean(expiry && expiry.getTime() < now.getTime());
    }

    function sortByFeaturedThenDate(a, b) {
        if (Boolean(a.featured) !== Boolean(b.featured)) {
            return a.featured ? -1 : 1;
        }

        const aDate = parseDate(a.startDate);
        const bDate = parseDate(b.startDate);

        if (aDate && bDate) return aDate.getTime() - bDate.getTime();
        if (aDate) return -1;
        if (bDate) return 1;

        return String(a.title || "").localeCompare(String(b.title || ""));
    }

    function partitionPrograms(programs, now = new Date()) {
        const visible = (programs || []).filter((program) => {
            return program && program.isPublished !== false && !isExpired(program, now);
        });

        const upcoming = visible
            .filter((program) => !isRecurringProgram(program))
            .sort(sortByFeaturedThenDate);

        const recurring = visible
            .filter(isRecurringProgram)
            .sort(sortByFeaturedThenDate);

        return { upcoming, recurring };
    }

    function getConfig() {
        const config = global.NUQTA_SANITY || {};
        return config.programs || config;
    }

    function isConfigured(config) {
        return Boolean(
            config &&
                config.projectId &&
                !String(config.projectId).startsWith("YOUR_") &&
                config.dataset,
        );
    }

    function getQueryUrl(config) {
        const host = config.useCdn === false ? "api" : "apicdn";
        const configuredVersion = config.apiVersion || "2025-05-08";
        const apiVersion = String(configuredVersion).startsWith("v")
            ? configuredVersion
            : `v${configuredVersion}`;
        const base = `https://${config.projectId}.${host}.sanity.io/${apiVersion}/data/query/${config.dataset}`;
        const params = new URLSearchParams({ query: PROGRAMS_QUERY });
        return `${base}?${params.toString()}`;
    }

    async function fetchPrograms(config = getConfig(), fetchImpl = global.fetch) {
        if (!isConfigured(config)) {
            return [];
        }

        const response = await fetchImpl(getQueryUrl(config));
        if (!response.ok) {
            throw new Error(`Sanity returned ${response.status}`);
        }

        const payload = await response.json();
        return Array.isArray(payload.result) ? payload.result : [];
    }

    function createElement(tag, className, text) {
        const element = global.document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function formatDate(value, options) {
        const date = parseDate(value);
        if (!date) return "";

        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    function isSameCalendarDay(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    function formatEventDateRange(startDate, endDate) {
        const start = parseDate(startDate);
        const end = parseDate(endDate);
        if (!start) return "To be announced";

        const date = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(start);

        const timeFormat = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });

        if (!end) {
            return `${date} · ${timeFormat.format(start)}`;
        }

        if (isSameCalendarDay(start, end)) {
            return `${date} · ${timeFormat.format(start)}-${timeFormat.format(end)}`;
        }

        const endLabel = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(end);

        return `${date} · ${timeFormat.format(start)} to ${endLabel}`;
    }

    function plainTextFromBlock(block) {
        if (!block || !Array.isArray(block.children)) return "";
        return block.children.map((child) => child.text || "").join("");
    }

    function renderMetaItem(label, value) {
        if (!value) return null;

        const item = createElement("div", "program-meta-card");
        item.appendChild(createElement("dt", "program-meta-card__label", label));
        item.appendChild(createElement("dd", "program-meta-card__value", value));
        return item;
    }

    function appendIfPresent(parent, child) {
        if (child) parent.appendChild(child);
    }

    function getProgramLabel(program) {
        if (program.programType === "recurring") return "Ongoing";
        return "Upcoming";
    }

    function renderProgramCard(program, options = {}) {
        const article = createElement(
            "article",
            `program-event-card glass-panel${program.featured ? " is-featured" : ""}`,
        );

        const media = createElement("div", "program-event-card__media");
        const image = createElement("img", "program-event-card__image");
        image.src = program.flyerImageUrl || PLACEHOLDER_IMAGE;
        image.alt = program.flyerImageAlt || "";
        image.loading = "lazy";
        image.decoding = "async";
        media.appendChild(image);

        const body = createElement("div", "program-event-card__body");
        const labelRow = createElement("div", "program-event-card__labels");
        labelRow.appendChild(
            createElement("span", "program-label", getProgramLabel(program)),
        );
        if (program.featured) {
            labelRow.appendChild(createElement("span", "program-label program-label--featured", "Featured"));
        }

        const title = createElement("h3", "program-event-card__title", program.title);
        const summary = createElement("p", "program-event-card__summary", program.summary);

        const description = createElement("div", "program-event-card__description");
        (program.description || [])
            .map(plainTextFromBlock)
            .filter(Boolean)
            .forEach((paragraph) => {
                description.appendChild(createElement("p", "", paragraph));
            });

        const meta = createElement("dl", "program-meta-grid");
        if (!options.recurring) {
            appendIfPresent(
                meta,
                renderMetaItem("Date", formatEventDateRange(program.startDate, program.endDate)),
            );
        }
        appendIfPresent(meta, renderMetaItem("Location", program.location));
        appendIfPresent(meta, renderMetaItem("Audience", program.audience));
        appendIfPresent(meta, renderMetaItem("Fee", program.fee));
        appendIfPresent(
            meta,
            renderMetaItem(
                "Deadline",
                formatDate(program.registrationDeadline, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                }),
            ),
        );
        appendIfPresent(
            meta,
            renderMetaItem(
                "Partners",
                Array.isArray(program.partners) ? program.partners.join(", ") : "",
            ),
        );

        const actions = createElement("div", "program-event-card__actions");
        if (program.givebutterUrl) {
            const cta = createElement(
                "a",
                "gradient-button program-event-card__cta",
                program.ctaLabel || "Register",
            );
            cta.href = program.givebutterUrl;
            cta.target = "_blank";
            cta.rel = "noopener noreferrer";
            actions.appendChild(cta);
        }

        body.appendChild(labelRow);
        body.appendChild(title);
        if (summary.textContent) body.appendChild(summary);
        if (description.childElementCount) body.appendChild(description);
        if (meta.childElementCount) body.appendChild(meta);
        if (actions.childElementCount) body.appendChild(actions);

        article.appendChild(media);
        article.appendChild(body);

        return article;
    }

    function replaceChildren(parent, children) {
        parent.textContent = "";
        children.forEach((child) => parent.appendChild(child));
    }

    function renderPrograms(programs, now = new Date()) {
        const upcomingList = global.document.querySelector("[data-program-upcoming]");
        const recurringList = global.document.querySelector("[data-program-recurring]");
        const recurringSection = global.document.querySelector("[data-program-recurring-section]");
        const emptyState = global.document.querySelector("[data-program-empty]");
        const loadingState = global.document.querySelector("[data-program-loading]");

        if (!upcomingList || !recurringList || !emptyState || !recurringSection) {
            return;
        }

        const { upcoming, recurring } = partitionPrograms(programs, now);

        replaceChildren(
            upcomingList,
            upcoming.map((program) => renderProgramCard(program)),
        );
        replaceChildren(
            recurringList,
            recurring.map((program) => renderProgramCard(program, { recurring: true })),
        );

        upcomingList.hidden = upcoming.length === 0;
        emptyState.hidden = upcoming.length > 0;
        recurringSection.hidden = recurring.length === 0;
        if (loadingState) loadingState.hidden = true;
    }

    async function initPrograms() {
        const loadingState = global.document.querySelector("[data-program-loading]");

        try {
            const programs = await fetchPrograms();
            renderPrograms(programs);
        } catch (error) {
            if (loadingState) {
                loadingState.textContent =
                    "Programs could not be loaded right now. Please check back soon.";
            }
            global.console.error(error);
        }
    }

    global.NuqtaPrograms = {
        fetchPrograms,
        formatEventDateRange,
        getExpiryDate,
        getQueryUrl,
        isExpired,
        partitionPrograms,
        renderPrograms,
    };

    if (global.document) {
        global.document.addEventListener("DOMContentLoaded", initPrograms);
    }
})(typeof window !== "undefined" ? window : globalThis);
