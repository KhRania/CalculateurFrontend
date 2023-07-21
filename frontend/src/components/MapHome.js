import React from "react";
import "../css/map-component.css";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import AbstractComponent from "./AbstractComponent";
import { mapSettings } from "../common/config";
import ajax from "../common/ajax";
import "../css/main.css";
import "../css/circle.css";
import "../css/patrol.css";
import Circle from "./Circle";
import Polygone from "./Polygone";
import addresses from "../common/addresses.json"; // Relative path to your File
import Loading from "./Loading";


class MapHome extends AbstractComponent {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);

    this.state = {
      mode1: true,
      shouldFollowTarget: mapSettings.defaults.shouldFollowTarget,
      theta: 0,
      x: 0,
      y: 0,
      screenWidth: null,
      mapWidth: "",
      mapHeight: "",
      height: "",
      width: "",
      positionX: 0,
      positionGoToX: 0,
      positionGoToY: 0,
      positionY: 0,
      positionGoTox: "",
      positionGoToy: "",
      editingId: 0,
      goal_x: 0,
      goal_y: 0,
      id: undefined,
      active: "",
      points: [],
      patrols: [],
      arrayX: [],
      arrayY: [],
      areas: [],
      weather: "--",
      CenterZoom:true
    };
    this.child = React.createRef();
    this.imgref = React.createRef();

    this.map = undefined;
    this.minScaleFactor = mapSettings.defaults.minScaleFactor;
    this.maxScaleFactor = mapSettings.defaults.maxScaleFactor;
    this.scaleFactor = undefined;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.Viewer = undefined;
    this.toggleHidden1 = this.toggleHidden1.bind(this);
    this.GoTOPosition = this.GoTOPosition.bind(this);
    // this.onImageLoad = this.onImageLoad.bind(this)
  }

  /* onSocketIOConnected(SocketIOClient) {
        this.subscribeEvent()} */

  onSocketIOConnected(socketIO) {
    this.subscribeEvent("robot-position", (newCoords) => {
      const { x, y, theta } = this.processRobotCoord(newCoords);
      if (this.map && this.state.shouldFollowTarget) {
      this.map.setPointOnViewerCenter(
        x,
         y,
         0.7
       )}
      this.setState({ x, y, theta });
    });
    ajax("GET", "robot/map/size", null, (response) => {
      if (response.ok) {
        localStorage.setItem("Date", JSON.stringify(response));

        this.setState({
          mapWidth: response.data.width,
          mapHeight: response.data.height,
        });
        //this.GetPatrols(response.data.height,response.data.width);
        this.onImageLoad();
        if (this.map && this.state.shouldFollowTarget) {
          this.map.fitToViewer();

        }


        socketIO.emit("robot-position-request");
        this.subscribeEvent("robot-goal", (Coords) => {
          if (Coords) {
            const { goal_theta, goal_x, goal_y, id } =
              this.processRobotCoordGoal(Coords);
            this.setState({ goal_theta, goal_x, goal_y, id });
          }
        });
        // socketIO.emit("robot-goal-request");
        // this.subscribeEvent("patrol-name", (name) => {
        //   this.setState({ name });
        // });
        socketIO.emit("patrol-active-request");
        this.subscribeEvent("patrol-active", (active) => {
          this.setState({ active });
        });
        this.subscribeEvent("robot-weather", (weather) => {
          this.setState({
            weather: weather.toLowerCase() === "rain" ? weather : "",
          });
        });

        socketIO.emit("robot-weather-request");
      } else {
        console.log("Error trying to retrieve map info");
      }
    });

  }
componentDidMount(){
 if(this.state.x !==0)
  console.log(this.state.x)
}
  handleClose = () => {
    this.setState({ positionGoToY: 0, positionGoTox: 0 });
  };

  GoTOPosition = () => {
    if (this.props.robotConfig) {
      const { port } = this.props.robotConfig;
      let portactif;
      if (addresses.includes(window.location.hostname)) {
        portactif = port.rest;
      } else {
        portactif = port.Redirectedrest;
      }

      fetch(
        window.location.protocol +
          "//" +
          window.location.hostname +
          ":" +
          portactif +
          "/goto",

        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x: this.state.positionGoTox,
            y: this.state.positionGoToy,
            theta: -1,
          }),
        }
      ).catch(function (error) {
        console.log(error.error);
      });
    }
  };
  toggleHidden1(key1, patrolName) {
    //console.log(key1,patrolName)
    this.setState({ editingId: key1 });
    this.setState({ selected: key1 });
    this.props.parentCallbackGOTO(true, key1, patrolName, this.state.weather);
    let patrols = this.state.patrols;
    if (patrols) {
      patrols.map((patrol, key) => {
        //if (patrol.name === this.state.name) {
        patrol.points.map((c, i) => {
          key1 === i &&
            this.setState({
              positionGoToX: c.position.x,
              positionGoToY: c.position.y,
              positionGoTox:
                this.state.mapHeight > this.state.mapWidth
                  ? c.position.y
                  : c.position.x,
              positionGoToy:
                this.state.mapHeight > this.state.mapWidth
                  ? this.state.mapHeight - c.position.x
                  : c.position.y,
            });
          return null;
        });
        return null;
      });
    }
  }

  /*----*/
  GetPatrols() {
    ajax("GET", "robot/patrol", null, (patrols) => {
      let obj = patrols.patrols;

      if (obj) {
        const x = obj.map((item) => {
          // if (item.name === this.state.name) {

          item.points.map((c, i) => {
            if (this.state.mapHeight > this.state.mapWidth) {
              const a = c.position.x;
              c.position.x = this.state.mapHeight - c.position.y;
              c.position.y = a;
            } else {
              c.position.x = c.position.x;
              c.position.y = c.position.y;
            }
            this.setState({ patrols: x });
            return null;
          });
          return null;
        });
        this.setState({
          patrols: obj,
        });
        //}
      }
    });

    ajax("GET", "robot/area", null, (responseArea) => {
      let obj = responseArea.areas;

      if (obj) {
        const x = obj.map((item) => {
          item.points.map((c, i) => {
            if (this.state.mapHeight > this.state.mapWidth) {
              const a = Number(parseFloat(c.position.x).toFixed(2));
              c.position.x = Number(
                parseFloat(this.state.mapHeight - c.position.y).toFixed(2)
              );
              c.position.y = Number(parseFloat(a).toFixed(2));
            } else {
              c.position.x = Number(parseFloat(c.position.x).toFixed(2));
              c.position.y = Number(parseFloat(c.position.y).toFixed(2));
            }
            this.setState({ areas: x });
            return null;
          });
          return null;
        });
        this.setState({
          areas: obj,
        });
      }
    });
  }
  // processRobotCoordGoal(Coords) {
  //   if (Coords) {
  //     return {
  //       goal_theta: (-Coords.goal_theta * 180) / Math.PI,
  //       goal_x: this.state.mapHeight - Coords.goal_y,
  //       goal_y: Coords.goal_x,
  //       id: Coords.id,
  //     };
  //   }
  // }

  // processRobotCoord(newCoords) {
  //   return {
  //     theta: -newCoords.theta,
  //     x: this.state.mapHeight - newCoords.y,
  //     // y: this.state.mapHeight - newCoords.y
  //     y: newCoords.x,

  //     /*  }
  //   else return {
  //     theta: (-newCoords.theta *-(1)) +180,
  //     x: this.state.mapHeight-newCoords.y,
  //    // y: this.state.mapHeight - newCoords.y
  //     y: newCoords.x,*/
  //   };
  // }

  processRobotCoordGoal(Coords) {
    if (Coords) {
      if (this.state.mapHeight > this.state.mapWidth) {
        return {
          goal_theta: (-Coords.goal_theta * 180) / Math.PI,
          goal_x: this.state.mapHeight - Coords.goal_y,
          goal_y: Coords.goal_x,
          id: Coords.id,
        };
      } else
        return {
          goal_theta: (-Coords.goal_theta * 90) / Math.PI,
          goal_x: Coords.goal_x,
          goal_y: Coords.goal_y,
          id: Coords.id,
        };
    }
  }

  processRobotCoord(newCoords) {
  

    if (this.state.mapHeight > this.state.mapWidth) {
      return {
        theta: -newCoords.theta,
        x: this.state.mapHeight - newCoords.y,
        // y: this.state.mapHeight - newCoords.y
        y: newCoords.x,
        
      };

    } else{
      return {
        theta: -newCoords.theta*180,
        x: newCoords.x,
        // y: this.state.mapHeight - newCoords.y
        y: newCoords.y,
      };}

      

  }

  // onChangeValue = (value) => {
  //   if (this.scaleFactor !== value.a) {
  //     this.scaleFactor = value.a;
  //   }
  //   this.setState({ miniatureOpen: value.miniatureOpen });
  // };
  onToggleTargetLock = () => {
    console.log('ok')
  // if(this.state.x && this.state.y){
  //     this.map.setPointOnViewerCenter(
  //       this.state.x,
  //       this.state.y,
  //      0.7
  //     );
    
  this.setState({ Centerzoom: !this.state.Centerzoom });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.mapWidth !== this.state.mapWidth ||
      prevState.mapHeight !== this.state.mapHeight
    ) {
      this.GetPatrols();
    }
  
  }

  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
   
  }

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }
  onImageLoad = () => {
    this.setState({
      height: this.imgref.current.clientHeight,
      width: this.imgref.current.clientWidth,
    });
  };
  checkClick() {
    console.log("clicked!")
  }
  render() {
    const { mapWidth, goal_x, goal_y, id, x, y, mapHeight, patrols, areas } =
      this.state;
    const shouldDisplayMap = mapHeight && mapWidth;
    const shouldDisplayPatrol = patrols;
    const shouldDisplayArea = areas;
    if (shouldDisplayMap)
      return (
        <div className="map-panel" id="map-littel" ref={this.imgref}>
       {/* <button ref={button=> this.button = button} onClick={this.onToggleTargetLock}>click</button> */}
{/* <IconButton aria-label="delete" onClick={()=>this.map.setPointOnViewerCenter(
      this.state.x,
       this.state.y,
       0.7
     )} size="small">
          <DeleteIcon fontSize="inherit" />
</IconButton>   */}      
         <ReactSVGPanZoom 
            width={this.state.width !== "" ? this.state.width : 0}
            height={this.state.height !== "" ? this.state.height : 0}
            miniaturePosition={"none"}
            toolbarPosition={this.state.screenWidth > 1275 ? "left" : "top"}
            ref={(map) => (this.map = map)}
            SVGBackground="transparent"
            background="transparent"
          >
            <svg width={mapHeight} height={mapWidth}>
              <g>
                {mapHeight >= mapWidth ? (
                  (
                    <svg style={{ visibility: "hidden" }}>
                      <image href="/api/robot/map" x="0" y="0" />
                    </svg>
                  ) && (
                    <image href="map.png" width={mapHeight} height={mapWidth} />
                  )
                ) : (
                  <image href="api/robot/map"></image>
                )}
              </g>
              {this.state.active === false ||
              goal_x === 0 ||
              goal_y === 0 ? null : (
                <g>
                  <circle
                    cx={goal_x}
                    cy={goal_y}
                    r="17"
                    fill="#FAA546"
                    stroke="#FAA546"
                    strokeWidth="1"
                  />
                  <circle
                    cx={goal_x}
                    cy={goal_y}
                    r="50"
                    fillOpacity="0"
                    stroke="#fdbc75"
                    strokeWidth="20px"
                    strokeOpacity="0.7"
                  >
                    <animate
                      attributeName="r"
                      from="0"
                      to="20"
                      dur="6s"
                      repeatCount="indefinite"
                      begin="0.25s"
                    />
                  </circle>
                  <text
                    x={goal_x}
                    y={goal_y}
                    fill="red"
                    fontSize="7"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    {id}
                  </text>
                </g>
              )}{" "}
              {this.state.positionGoToX !== 0 &&
              this.state.positionGoToY !== 0 &&
              this.state.positionGoToX !== this.state.goal_x &&
              this.state.positionGoToY !== this.state.goal_y &&
              this.state.positionGoToX !== this.state.positionX &&
              this.state.positionGoToY !== this.state.positionY ? (
                <g>
                  <circle
                    cx={this.state.positionGoToX}
                    cy={this.state.positionGoToY}
                    r="17"
                    fill="red"
                    stroke="red"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx={this.state.positionGoToX}
                    cy={this.state.positionGoToY}
                    r="50"
                    fillOpacity="0"
                    stroke="red"
                    strokeWidth="20px"
                    strokeOpacity="0.7"
                  >
                    <animate
                      attributeName="r"
                      from="0"
                      to="20"
                      dur="6s"
                      repeatCount="indefinite"
                      begin="0.25s"
                    />
                  </circle>
                </g>
              ) : null}
              {shouldDisplayArea &&
                areas.map((item) => {
                  let arrayX = [];
                  let arrayY = [];

                  return item.points.map(
                    (c, i) => (
                      // eslint-disable-next-line
                      arrayX.push(c.position.x),
                      arrayY.push(c.position.y),
                      (
                        <Polygone
                          onReff={(ref) => (this.child = ref)}
                          parentCallback={this.callbackFunction}
                          area={this.state.areas}
                          x={c.position.x}
                          y={c.position.y}
                          id={i}
                          arrayX={arrayX}
                          arrayY={arrayY}
                        />
                      )
                    )
                  );
                })}
              {shouldDisplayPatrol &&
                patrols.map((item) => {
                  let arrayX = [];
                  let arrayY = [];
                  return item.points.map(
                    (c, i) => (
                      // eslint-disable-next-line
                      arrayX.push(c.position.x),
                      arrayY.push(c.position.y),
                      (
                        <g
                          onClick={this.toggleHidden1.bind(this, i, item.name)}
                        >
                          <Circle
                            onReff={(ref) => (this.child = ref)}
                            patrol={this.state.patrols}
                            x={c.position.x}
                            y={c.position.y}
                            id={i}
                            arrayX={arrayX}
                            arrayY={arrayY}
                          />
                        </g>
                      )
                    )
                  );
                  // }
                })}
              {x === 0 || y === 0 ? null : (
                <g
                  transform={
                    "translate(" +
                    this.state.x +
                    ", " +
                    this.state.y +
                    ") rotate(" +
                    this.state.theta +
                    ")"
                  }
                >
                  <path
                    stroke="rgb(234, 106, 18)"
                    strokeWidth="1.79"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    fill="none"
                    d="M 13.47,7.02 L 19.96,-0.09 20,-0.13 13.3,-7.2"
                  />
                  <path
                    stroke="none"
                    fill="rgb(0, 0, 0)"
                    d="M 9.55,-0.02 C 9.54,5.01 5.76,8.2 5.76,8.2 5.76,8.2 9.89,9.97 10.45,10.18 10.74,10.29 10.98,10.74 11.04,12.4 10.98,15.09 9.19,15 9.19,15 L -6.16,15 C -6.16,15 -7.3,14.98 -7.53,13.85 -7.76,12.72 -7.98,11.25 -7.98,11.25 L -20,3.63 -20,-3.67 -7.98,-11.29 C -7.98,-11.29 -7.76,-12.76 -7.53,-13.89 -7.3,-15.02 -6.16,-15 -6.16,-15 L 9.19,-15 C 9.19,-15 10.98,-15.13 11.04,-12.44 10.98,-10.78 10.74,-10.33 10.45,-10.22 9.89,-10.01 5.76,-8.24 5.76,-8.24 5.76,-8.24 9.54,-5.05 9.55,-0.02 Z M 9.55,-0.02"
                  />
                  <path
                    stroke="none"
                    fill="rgb(208, 208, 208)"
                    d="M 8.83,-0.01 C 8.82,-6.07 2.72,-9.28 -0.21,-10.24 -0.3,-10.27 -4.23,-10.1 -4.56,-10.07 -5.61,-10.44 -7.41,-11.09 -7.98,-11.28 -7.96,-11.3 -0.49,-11.67 -0.49,-11.67 L -0.49,-11.67 C -0.5,-11.63 0.52,-10.22 0.52,-10.22 0.52,-10.22 9.71,-10.24 10.53,-10.25 9.96,-10.01 5.78,-8.24 5.78,-8.24 5.78,-8.24 9.54,-5.05 9.54,-0.01 9.54,5.02 5.78,8.21 5.78,8.21 L 5.8,8.19 C 5.78,8.21 9.96,9.98 10.53,10.22 9.71,10.22 0.52,10.19 0.52,10.19 L -0.5,11.61 C -0.49,11.65 -7.96,11.27 -7.98,11.25 -7.41,11.06 -5.61,10.41 -4.56,10.05 -4.23,10.07 -0.3,10.25 -0.21,10.21 1.45,9.67 4.13,8.41 6.14,6.31 7.68,4.71 8.83,2.61 8.83,-0.01 Z M 8.14,-0.01 C 8.14,-0.82 7.89,-2.19 7.89,-2.19 7.89,-2.19 8.29,-1.06 8.29,-0.01 8.29,1.03 7.89,2.16 7.89,2.16 7.89,2.16 8.14,0.79 8.14,-0.01 Z M 6.33,-0.01 C 6.33,0.69 6.4,1.41 6.51,1.41 6.62,1.41 6.76,0.69 6.76,-0.01 6.76,-0.72 6.62,-1.44 6.51,-1.44 6.4,-1.44 6.33,-0.72 6.33,-0.01 Z M 0.3,-5.46 C 0.39,-5.54 3.54,-2.71 3.59,-0.02 3.54,2.67 0.39,5.51 0.28,5.43 0.17,5.35 3.28,2.71 3.33,-0.02 3.28,-2.74 0.3,-5.46 0.3,-5.46 Z M -2.31,-0.01 L -2.32,5.71 C -2.32,5.71 -2.33,5.86 -2.19,6.01 -2.05,6.16 -1.78,6.3 -1.23,6.3 -1.72,7.09 -2.38,7.61 -2.87,7.88 -3.15,8.04 -3.37,8.11 -3.46,8.11 -3.46,8.11 -7.38,6.43 -7.41,6.42 -7.41,6.42 -8.73,6.85 -8.91,6.91 -9.13,6.82 -10.84,6.14 -10.84,6.14 L -13.13,6.27 -11.17,7.87 C -11.14,7.86 -7.46,6.64 -7.46,6.64 -7.42,6.62 -3.43,8.33 -3.43,8.33 -3.43,8.33 -3.44,9.48 -3.44,9.47 -3.44,9.48 -7.36,7.78 -7.36,7.78 L -11.27,9.15 C -11.27,9.15 -19.96,3.67 -20,3.65 L -20,-0.02 -20,-3.67 C -19.96,-3.7 -11.27,-9.18 -11.27,-9.18 L -7.36,-7.81 -3.44,-9.5 -3.44,-9.5 C -3.44,-9.5 -3.43,-8.36 -3.43,-8.36 L -7.42,-6.65 C -7.46,-6.67 -11.14,-7.89 -11.14,-7.89 -11.17,-7.9 -13.13,-6.3 -13.13,-6.3 L -10.84,-6.17 C -10.84,-6.17 -9.13,-6.85 -8.91,-6.94 -8.73,-6.88 -7.41,-6.45 -7.41,-6.45 -7.38,-6.46 -3.46,-8.14 -3.46,-8.14 -3.37,-8.14 -3.15,-8.07 -2.87,-7.91 -2.38,-7.63 -1.71,-7.12 -1.23,-6.33 -1.78,-6.33 -2.05,-6.18 -2.19,-6.04 -2.33,-5.89 -2.32,-5.74 -2.32,-5.74 L -2.31,-0.01 Z M 7.85,-0.01 C 7.84,1.07 7.45,1.83 7.45,1.83 7.42,1.85 6.24,1.85 6.24,1.85 6.14,1.85 6,0.91 6,-0.01 6,-0.95 6.14,-1.88 6.24,-1.88 L 7.42,-1.88 C 7.54,-1.77 7.84,-1.1 7.85,-0.01 Z M 7.06,-0.01 C 7.06,0.37 7.06,1.25 7.15,1.41 7.24,1.41 7.35,0.66 7.35,-0.01 7.35,-0.69 7.24,-1.44 7.16,-1.44 7.06,-1.28 7.06,-0.39 7.06,-0.01 Z M 7.06,-0.01"
                  />
                </g>
              )}
            </svg>
          </ReactSVGPanZoom>
        </div>
      );
    else
      return (
        <div id="map-container">
          <Loading />
        </div>
      );
  }
}

export default MapHome;