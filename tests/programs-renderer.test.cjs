const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadRenderer() {
    const source = fs.readFileSync(
        path.join(__dirname, "..", "assets/js/programs-renderer.js"),
        "utf8",
    );
    const context = {
        console,
        window: {},
        URLSearchParams,
        Intl,
        Date,
        Set,
        String,
        Boolean,
        Array,
        Number,
    };
    vm.createContext(context);
    vm.runInContext(source, context);
    return context.window.NuqtaPrograms;
}

test("partitions featured, future, expired, and evergreen programs", () => {
    const renderer = loadRenderer();
    const now = new Date("2026-05-08T12:00:00-04:00");
    const programs = [
        {
            title: "Standard future event",
            programType: "event",
            startDate: "2026-05-20T18:00:00-04:00",
            isPublished: true,
        },
        {
            title: "Expired event",
            programType: "event",
            startDate: "2026-04-01T18:00:00-04:00",
            isPublished: true,
        },
        {
            title: "Featured future event",
            programType: "event",
            startDate: "2026-06-01T18:00:00-04:00",
            featured: true,
            isPublished: true,
        },
        {
            title: "Date coming soon",
            programType: "event",
            isPublished: true,
        },
        {
            title: "MSA ROOTS",
            programType: "recurring",
            isPublished: true,
        },
        {
            title: "Hidden draft",
            programType: "event",
            startDate: "2026-05-12T18:00:00-04:00",
            isPublished: false,
        },
    ];

    const result = renderer.partitionPrograms(programs, now);

    assert.deepEqual(
        result.upcoming.map((program) => program.title),
        ["Featured future event", "Standard future event", "Date coming soon"],
    );
    assert.deepEqual(
        result.evergreen.map((program) => program.title),
        ["MSA ROOTS"],
    );
});

test("uses expiresAt before endDate and startDate when hiding old programs", () => {
    const renderer = loadRenderer();
    const now = new Date("2026-05-08T12:00:00-04:00");

    assert.equal(
        renderer.isExpired(
            {
                startDate: "2026-05-20T18:00:00-04:00",
                endDate: "2026-05-20T20:00:00-04:00",
                expiresAt: "2026-05-01T09:00:00-04:00",
            },
            now,
        ),
        true,
    );
});

test("builds Sanity query URLs with the required version prefix", () => {
    const renderer = loadRenderer();
    const url = renderer.getQueryUrl({
        projectId: "abc123",
        dataset: "production",
        apiVersion: "2025-05-08",
        useCdn: true,
    });

    assert.equal(
        url.startsWith("https://abc123.apicdn.sanity.io/v2025-05-08/data/query/production?"),
        true,
    );
    assert.equal(decodeURIComponent(url).includes("isPublished == true"), false);
});
