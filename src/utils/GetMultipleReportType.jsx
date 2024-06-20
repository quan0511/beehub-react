import GetReportType from "./GetReportType";
import { countDuplicate } from "./utils";

function GetMultipleReportType({ reports }) {
    if (!reports || reports.length == 0) return
    let o = countDuplicate(reports);
    return <>{Object.keys(o).map((key, i) => <GetReportType key={i} number={o[key]} type={key} />)}</>
}

export default GetMultipleReportType;