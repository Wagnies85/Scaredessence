export function generateICS(events: { title: string; date: string; description: string }[]) {
  const header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sacred Essence//Cosmic Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ].join("\r\n");

  const footer = "END:VCALENDAR";

  const body = events.map(event => {
    const date = new Date(event.date);
    const dateStr = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour duration
    const endStr = end.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const uid = `${dateStr}-${Math.random().toString(36).substr(2, 9)}@sacredessence.app`;

    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dateStr}`,
      `DTSTART:${dateStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      "END:VEVENT",
    ].join("\r\n");
  }).join("\r\n");

  return `${header}\r\n${body}\r\n${footer}`;
}

export function downloadICS(content: string, filename: string = "cosmic-calendar.ics") {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
