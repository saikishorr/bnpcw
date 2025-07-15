<script>
function searchHomepage() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const bodyText = document.body.innerText.toLowerCase();

    const status = document.getElementById("searchStatus");

    if (input.length < 2) {
        status.innerText = '';
        return;
    }

    if (bodyText.includes(input)) {
        status.innerText = `Results found for "${input}"`;
        status.style.color = "green";
    } else {
        status.innerText = `No results found for "${input}"`;
        status.style.color = "red";
    }
}
</script>
