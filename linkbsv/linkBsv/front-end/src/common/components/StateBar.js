import {} from "@material-ui/icons";
import Circle from "../../features/Link/components/Circle"

function StatBar() {
  return (
    <div className="">
      {/* <div className="analytics-span">
        <i className="icon-analytics"></i>
      </div> */}
      <span className="pr-3">
        <span className="pr-1">
          <Circle bgColor="rgba(245,119,62,1)" />
        </span>
        <span>Views: </span>
        <span>120</span>
      </span>
      <span>
        <span className="pr-1">
          <Circle bgColor="rgba(4,54,115,1)"/>
        </span>
        <span>Clicks: </span>
        <span>120</span>
      </span>
    </div>
  );
}

export default StatBar;
