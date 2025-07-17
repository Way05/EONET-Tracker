export default function EventList() {
  //   const api_key: string = process.env.TOKEN!;
  const params = new URLSearchParams();
  params.append("status", "open");
  params.append("limit", "1");
  //   params.append("api_key", api_key);
  async function getData() {
    const res = await fetch(
      `https://eonet.gsfc.nasa.gov/api/v3/events?${params}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const json = await res;
    console.log(json);
  }
  getData();
  return <div></div>;
}
