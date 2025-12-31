export async function loadHtml(path) {
    const res = await fetch(path);
    const fileContent = await res.text();
    return fileContent;
}