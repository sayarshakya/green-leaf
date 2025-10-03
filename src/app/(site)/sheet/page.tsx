// app/(site)/sheet/page.tsx
export default async function SheetPage() {
  // 1. Fetch spreadsheet metadata (to get tab names)
  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SHEET_ID}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    { cache: "no-store" }
  );

 const metaData = (await metaRes.json()) as { sheets: { properties: { title: string } }[] };
 const sheetTabs: string[] = metaData.sheets.map((s) => s.properties.title);

  // 2. Fetch data for each tab
  const tabData: Record<string, string[][]> = {};
  for (const tab of sheetTabs) {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SHEET_ID}/values/${encodeURIComponent(
        tab
      )}?key=${process.env.GOOGLE_API_KEY}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    tabData[tab] = data.values || [];
  }

  return (
    <div className="p-6 space-y-12">
      {sheetTabs.map((tab) => (
        <div key={tab}>
          <h2 className="text-xl text-black font-semibold mb-3">{tab}</h2>
          <table className="border-collapse border border-gray-400 w-full mb-6">
            <tbody>
              {tabData[tab].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="text-black border border-gray-400 p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
