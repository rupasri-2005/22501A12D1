export function customLogger(eventType,data)
{
    const log = {
        time: new Date().toISOString(),
        eventType,
        data,
    };
    const logs = JSON.parse(localStorage.getItem("logs")|| "[]");
    logs.push(log);
    localStorage.setItem('logs',JSON.stringify(logs));
}