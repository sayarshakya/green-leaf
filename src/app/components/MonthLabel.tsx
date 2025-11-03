import DateFormatter from "@/app/components/DateFormatter";

const MonthLabel = ({ dateValue }: { dateValue: string | Date }) => {
  const date = new Date(dateValue);
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // Pick background color based on month
  const bgColor =
    month === "01"
      ? "bg-sky-400" // January
      : month === "07"
      ? "bg-amber-300" // July
      : "bg-green-400"; // default

  return (
    <label
      className={`inline-block border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-800 ${bgColor}`}
    >
      <DateFormatter value={dateValue} />
    </label>
  );
};

export default MonthLabel;
