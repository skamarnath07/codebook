const textarea = document.querySelector("#textarea");
const characterCount = document.querySelector("#character-count");

if (textarea && characterCount) {
    const updateCharacterCount = () => {
        const count = textarea.value.length;
        characterCount.textContent = `${count} ${count === 1 ? "character" : "characters"}`;
    };

    textarea.addEventListener("input", updateCharacterCount);
    updateCharacterCount();
}

document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
        const entry = button.closest(".entry-card");
        const code = entry?.querySelector("code");
        const status = entry?.querySelector(".copy-status");

        if (!code || !status) {
            return;
        }

        try {
            await navigator.clipboard.writeText(code.textContent ?? "");
            button.textContent = "Copied";
            status.textContent = "Copied to clipboard";
        } catch (error) {
            button.textContent = "Try again";
            status.textContent = "Copy failed. Select the text to copy it manually.";
        }
    });
});
