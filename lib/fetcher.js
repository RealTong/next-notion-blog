export default async function fetcher(input) {
    console.log("fetcher: ", input)
    const res = await fetch(input);
    return res.json();
}