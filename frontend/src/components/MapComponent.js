import React from "react";
import "../css/map-component.css";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import AbstractComponent from "./AbstractComponent";
import { mapSettings } from "../common/config";
import ajax from "../common/ajax";
import "../css/main.css";
import GamepadManager from "../common/GamepadManager.js";
import _ from "lodash";
import "../css/circle.css";
import "../css/patrol.css";
import Circle from "./Circle";
import Polygone from "./Polygone";
import SocketIOClient from "../common/SocketIOClient.js";
import Swal from "sweetalert2";
import i18n from "../i18n/i18n.js";
import addresses from "../common/addresses.json"; // Relative path to your File
import Loading from "./Loading";

class MapComponent extends AbstractComponent {
  _isMounted = false;
  timer = null;
  
  constructor(props) {
    super(props);

    this.state = {
      mode1: true,
      shouldFollowTarget: mapSettings.defaults.shouldFollowTarget,
      miniatureOpen: true,
      theta: undefined,
      x: 0,
      y: 0,
      newPatrol: false,
      mapWidth: "",
      mapHeight: "",
      positionX: 0,
      positionGoToX: 0,
      positionGoToY: 0,
      positionY: 0,
      positionGoTox: "",
      positionGoToy: "",
      Height: "",
      Width: "",
      error: false,
      goal_x: 0,
      goal_y: 0,
      id: undefined,
      active: "",
      points: [],
      patrols: [],
      xNew: "",
      thetaNew: "",
      yNew: "",
      idNew: "",
      xAreaNew: "",
      thetaAreaNew: "",
      yAreaNew: "",
      idAreaNew: "",
      modalOpen: false,
      editingId: 0,
      childVisible: false,
      dimensions: {},
      name: null,
      //filterModal: "bottoneditModal",
      arrayX: [],
      arrayY: [],
      polyline: "",
      //textFilter: "Gestion des patrols:",
      showHideButtonsGroup: false,
      clickedArea: false,
      newArea: false,
      areaName: "",
      prevAreaName: "",
      areas: [],
      xLast: "",
      yLast: "",
      xFirst: "",
      yFirst: "",
      positionAreaX: 0,
      positionAreaY: 0,
      clickedCircleArea: -1,
      clickedCirclePatrol: -1,
      clickedCircle: "",
      arrayPointsArea: [],
      counter: 0,
      CircleArea1: false,
      CircleArea: false,
      counterArea: 0,
      deleteAreaItem: "",
      height: "",
      width: "",
      prevSelected: "",
      selected: "",
      selectedPointArea: "",
      clic: false,
      weather: "--",
    };
    this.child = React.createRef();
    this.imgref = React.createRef();
    this.map = undefined;
    this.minScaleFactor = mapSettings.defaults.minScaleFactor;
    this.maxScaleFactor = mapSettings.defaults.maxScaleFactor;
    this.scaleFactor = undefined;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseAddArea = this.onMouseAddArea.bind(this);
    this.PostPoint = this.PostPoint.bind(this);
    this.addArea = this.addArea.bind(this);
    this.clearall = this.clearall.bind(this);
    this.clearAllAreas = this.clearAllAreas.bind(this);
    this.toggleHidden1 = this.toggleHidden1.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    //this.GotoPosition =this.GotoPosition.bind(this)
    this.DeleteArea = this.DeleteArea.bind(this);
    this.GoTOPosition = this.GoTOPosition.bind(this);
    this.onClickedCircle = this.onClickedCircle.bind(this);
    this.onClickedDeletedCircle = this.onClickedDeletedCircle.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.deletePointArea = this.deletePointArea.bind(this);
    this.addPointArea = this.addPointArea.bind(this);
  }

  init() {
    GamepadManager.init((gamepadState) => {
      this.fireEvent("gamepad-state", gamepadState);
    });
    ajax("GET", "robot/config", null, (resp) => {
      if (resp.ok && resp.data) {
        this.setState({ robotConfig: resp.data.config });
      }
    });
  }
  /* onSocketIOConnected(SocketIOClient) {
        this.subscribeEvent()} */

  onSocketIOConnected(SocketIOClient) {
    SocketIOClient.emit("Map-on");
    ajax("GET", "robot/map/size", null, (response) => {
      if (response.ok) {
        this.setState({
          mapWidth: response.data.width,
          mapHeight: response.data.height,
        });
        this.onImageLoad();
        if (this.map && this.state.shouldFollowTarget) {
          this.map.fitToViewer();
          //this.map.resize();
        }
        this.subscribeEvent("robot-position", (newCoords) => {
          const { x, y, theta } = this.processRobotCoord(newCoords);
          this.setState({ x, y, theta });
        });
        SocketIOClient.emit("robot-position-request");
        this.subscribeEvent("robot-goal", (Coords) => {
          if (Coords) {
            const { goal_theta, goal_x, goal_y, id } =
              this.processRobotCoordGoal(Coords);
            this.setState({ goal_theta, goal_x, goal_y, id });
          }
        });
        SocketIOClient.emit("robot-goal-request");
        this.subscribeEvent("patrol-name", (name) => {
          this.setState({ name });
        });
        SocketIOClient.emit("patrol-name-request");
        SocketIOClient.emit("patrol-active-request");
        this.subscribeEvent("patrol-active", (active) => {
          this.setState({ active });
        });
        this.subscribeEvent("robot-weather", (weather) => {
          this.setState({
            weather: weather.toLowerCase() === "rain" ? weather : "",
          });
        });
        SocketIOClient.emit("patrol-active-request");
        SocketIOClient.emit("robot-weather-request");
      } else {
        console.log("Error trying to retrieve map info");
      }
    });
  }
  terminate() {
    SocketIOClient.emit("Map-off");
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.onRef(this);
    //this.GetPatrols();
    // /* call function get areas */
    //this.GetAreas();
    window.addEventListener(
      "beforeunload",
      localStorage.setItem("newzone", "true")
    );
    window.addEventListener("unload", localStorage.setItem("newzone", "true"));
  }
  handleDoubleClick = () => {
    this.props.parentCallback(false);
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.props.onRef(undefined);
  }
  // onchangeCircle = (e, idpoint) => {
  //   this.child.handleChange(e, idpoint);
  // };    this.dragging = this.props.clickedDrag &&this.state.id===this.props.selected || this.props.prevSelected===this.props.selected;
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.mapWidth !== this.state.mapWidth ||
      prevState.mapHeight !== this.state.mapHeight
    ) {
      this.GetPatrols();
      this.GetAreas();
    }
  }

  handleChange = (value, id) => {
    this.state.patrols.map((item, key) => {
      item.points.map((c, i) => {
        let point = item.points[id];

        if (i === id) {
          // if (event.target.checked === true) {
          // if (point.orientations) {
          point.orientations = [];
          point.orientations.push(Number(value));
          //   }
          // } else {
          //   if (point.orientations) {
          //     var index = point.orientations.indexOf(
          //       Number(event.target.value)
          //     );
          //     if (index !== -1) {
          //       point.orientations.splice(index, 1);
          //       //this.setState({orientations: this.state.orientations});
          //     }
          //   }
          // }
        }
        return null;
      });
      return null;
    });
  };
  oncheckedCircle = (idpoint) => {
    this.handleChecked(idpoint);
  };
  onDragCircle = (e, id) => {
    this.child.handleMouseDown(e, true);
  };
  onClickedCircle = (e, id) => {
    e.preventDefault();
    let objPoint;
    if (this.state.patrols) {
      this.state.patrols.map((item, i) => {
        item.points.map((point, i) => {
          if (id === i) {
            objPoint = {
              orientations: [],
              position: {
                y: parseFloat(point.position.y + 15 * 2),
                x: parseFloat(point.position.x),
                theta: 0,
              },
              priority: 1,
            };
          }
          this.setState({
            xNew: point.position.x,
            yNew: point.position.y + 15 * 2,
            idNew: id + 1,
            thetaNew: 0,
          });

          return null;
        });

        item.points.splice(id + 1, 0, objPoint);
        return null;
      });
      // this.setState({ patrols: this.state.patrols })
    }
    this.setState({ patrols: this.state.patrols });
  };

  addPointArea = (e, id) => {
    //e.preventDefault();
    let objPoint;
    if (this.state.areas) {
      this.state.areas.map((item, i) => {
        item.points.map((point, j) => {
          if (id === j) {
            objPoint = {
              position: {
                y: parseFloat(point.position.y + 30 * 2),
                x: parseFloat(point.position.x),
                theta: 0,
              },
              priority: 1,
            };
          }
          this.setState({
            xAreaNew: point.position.x,
            yAreaNew: point.position.y + 30 * 2,
            idAreaNew: id + 1,
            thetaAreaNew: 0,
          });

          return null;
        });

        if (i === this.state.areaName) {
          item.points.splice(id + 1, 0, objPoint);
        }
        return null;
      });
    }
    this.setState({ areas: this.state.areas });
  };
  deletePointArea = (e, index) => {
    this.props.onClickedDeleteButton(true);
    e.preventDefault();
    if (this.state.areas) {
      this.state.areas.map((item, i) => {
        item.points.map((obj, j) => {
          if (j === index && i === this.state.areaName) {
            if (item.points.length === 2) {
              this.setState({
                areas: this.state.areas.splice(this.state.areaName, 1),
              });
              return null;
            } else if (index === item.points.length - 1) {
              item.points.splice(0, 1);
              item.points.pop();
              obj = item.points[item.points.length - 1];
              const objPoint = {
                position: {
                  y: obj.position.y,
                  x: obj.position.x,
                  theta: 0,
                },
                priority: 1,
              };
              item.points.splice(0, 0, objPoint); // eq insert at position 0 the last element
              return null;
            }
            item.points.splice(j, 1);
          }
          return null;
        });
        return null;
      });
    }
    this.setState({ areas: this.state.areas });
  };
  onClickedDeletedCircle = (e, idpoint) => {
    this.props.onClickedDeleteButton(true);
    e.preventDefault();
    if (this.state.patrols) {
      this.state.patrols.map((item, i) => {
        item.points.map((obj, j) => {
          if (j === idpoint) {
            item.points.splice(j, 1);
          }

          return null;
        });
        return null;
      });
    }
    this.setState({ patrols: this.state.patrols });
  };
  // handleChangetheta = (e, idpoint) => {
  //   this.child.onchangetheta(e, idpoint);
  // };
  // handleInputChangetheta = (e, idpoint) => {
  //   this.child.InputChangetheta(e, idpoint);
  // };

  handleChangetheta = (e, id) => {
    this.state.patrols.map((item, key) => {
      item.points.map((c, i) => {
        let point = item.points[id].position;
        if (i === id) {
          let value = e;
          point.theta = value;
        }

        return null;
      });
      return null;
    });
    return null;
  };
  handleInputChangetheta = (e, id) => {
    this.state.patrols.map((item, key) => {
      item.points.map((c, i) => {
        let point = item.points[id].position;
        if (i === id) {
          let value = Number(e.target.value);
          point.theta = value;
        }

        return null;
      });
      return null;
    });
  };
  onConfirm = () => {
    this.child.onConfirm();
  };
  onCancel = () => {
    this.child.onCancel();
  };
  //add

  PostPoint(data) {
    if (this.state.patrols) {
      const x = this.state.patrols.map((item) => {
        item.points.map((c, i) => {
          if (this.state.mapHeight > this.state.mapWidth) {
            const a = Number(parseFloat(c.position.x).toFixed(2));
            c.position.x = Number(parseFloat(c.position.y).toFixed(2));
            c.position.y = Number(
              parseFloat(this.state.mapHeight - a).toFixed(2)
            );
          } else {
            c.position.x = Number(parseFloat(c.position.x).toFixed(2));
            c.position.y = Number(parseFloat(c.position.y).toFixed(2));
          }
          this.setState({ patrols: x });
          return null;
        });
        return null;
      });
      data = this.state.patrols;
      // ajax("POST","robot/patrol" ,{patrols});
      const { port } = this.state.robotConfig;
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
          "/patrol",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patrols: data }),
        }
      )
        .then((response) => {
          if (response.ok) {
            this.GetPatrols();
          }
        })
        .catch(function (error) {
          console.log(error.error);
        });
    }
  }

  clearall() {
    this.setState({ patrols: [] });
  }

  GetPatrols() {
    ajax("GET", "robot/patrol", null, (patrols) => {
      let obj = patrols.patrols;

      if (obj) {
        const x = obj.map((item) => {
          // if (item.name === this.state.name) {
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
      //this.increment()
      //console.log(this.state.clickedCircleArea)
    });
  }

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
          goal_theta: (-Coords.goal_theta * 180) / Math.PI,
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
    } else
      return {
        theta: -newCoords.theta*180,
        x: newCoords.x,
        // y: this.state.mapHeight - newCoords.y
        y: newCoords.y,
      };
  }

  cancelModeClick() {
    this.setState({
      prevSelected: "",
      selected: "",
      areaName: "",
      prevAreaName: "",
    });
    this.props.onClickedDragChange();
  }

  toggleHidden1(key, item, theta, name) {
    this.setState({ editingId: key });
    //this.setState({areaName:name})
    this.setState((previousState) => ({
      prevSelected: previousState.selected,

      // prevAreaName: previousState.areaName,
    }));

    // if (this.state.clic ){

    //   this.props.addCircle?this.props.onClickUpdate():null
    //   this.props.showbuttonFunction()
    //   this.setState({clic:false})
    // }
    if (this.props.edit) {
      this.setState({ selected: key });

      if (this.props.buttonDeleteClicked) {
        this.props.onClickedDeleteButton(false);
        this.props.parentCallbackDelete(key, true, item, theta);
        //> this.setState({ selected: "" ,areaName:""});
      }
      if (this.state.selected !== this.state.prevSelected)
        this.props.onClickedDragChange();

      this.props.parentCallbackpatrol(key, true, item, theta, name);
      this.handleChecked(key, item);
    }

    if (!this.props.display) {
      this.setState({
        prevSelected: "",
        selected: "",
        areaName: "",
        prevAreaName: "",
      });
      let patrols = this.state.patrols;
      if (patrols) {
        patrols.map((patrol, key1) => {
          //if (patrol.name === this.state.name) {
          patrol.points.map((c, i) => {
            key === i &&
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
      this.props.parentCallbackGOTO(key, true, item.name, this.state.weather);
    }
  }
  toggleHiddenArea(key, item, theta, name) {
    //const zonefini = localStorage.getItem("zonefini");
    this.setState({ editingId: key });
    this.setState({ areaName: name });
    this.setState((previousState) => ({
      prevSelected: previousState.selectedPointArea,

      prevAreaName: previousState.areaName,
    }));

    // if (this.state.clic &&!this.props.deleteOnce){

    //   //this.props.addCircle?this.props.onClickUpdate()&this.setState({ selected: key }):null
    //   zonefini==="true"&&this.props.addRect?this.props.onClickUpdateArea():null
    //   this.props.showbuttonFunction()
    //   this.setState({clic:false})
    //  // this.setState({ selected: 1 })
    // }
    if (this.props.editArea) {
      this.setState({ selectedPointArea: key });
      if (this.props.buttonDeleteClicked) {
        this.props.onClickedDeleteButton(false);
        this.props.parentCallbackDelete(key, true, item, theta);
        //> this.setState({ selected: "" ,areaName:""});
      }
      if (
        this.state.selectedPointArea !== this.state.prevSelected ||
        this.state.areaName !== this.state.prevAreaName
      )
        this.props.onClickedDragChange();

      this.props.parentCallbackpatrol(key, true, item, theta, name);
      this.handleChecked(key, item);
    }
  }
  handleChecked = (id, item) => {
    // this.props.patrols.map((item, key) => {
    item.points.map((c, i) => {
      let point = item.points[id];
      if (i === id) {
        if (_.isEmpty(point.orientations)) {
          this.callbackFunctionchecked(false, false, false, false, false, id);
        } else {
          point.orientations.map((ckecked) => {
            if (ckecked === 0) {
              this.callbackFunctionchecked(
                true,
                false,
                false,
                false,
                false,
                id
              );
            }
            if (ckecked === 45) {
              this.callbackFunctionchecked(
                false,
                true,
                false,
                false,
                false,
                id
              );

              return null;
            }
            if (ckecked === 90) {
              this.callbackFunctionchecked(
                false,
                false,
                true,
                false,
                false,
                id
              );
            }
            if (ckecked === -90) {
              this.callbackFunctionchecked(
                false,
                false,
                false,
                true,
                false,
                id
              );
            }

            if (ckecked === -45) {
              this.callbackFunctionchecked(
                false,
                false,
                false,
                false,
                true,
                id
              );
            }
            return null;
          });
        }
      } else {
      }
      return null;
    });
    //   return null;
    // });
  };
  handleClose = () => {
    this.setState({ positionGoToY: 0, positionGoTox: 0 });
  };
  GoTOPosition = () => {
    if (this.state.robotConfig) {
      const { port } = this.state.robotConfig;
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

  onMouseMove(x, y) {
    if (this.state.patrols) {
      if (
        this.props.display &&
        !this.props.edit &&
        !this.props.delete &&
        this.props.addCircle
      ) {
        // this.props.onClickAdd()
        this.setState({
          positionX: x,
          positionY: y,
        });
        let patrols = this.state.patrols;

        if (_.isEmpty(patrols)) {
          patrols.push({
            points: [
              {
                position: {
                  y: y,
                  x: x,
                  theta: 0,
                },
                orientations: [],
                priority: 1,
              },
            ],
            type: 0,
            name: "Patrol" + this.state.counter,
          });
        } else {
          let patrols1 = patrols;
          patrols1.forEach((item, i) => {
            let obj1;
            obj1 = {
              position: {
                y: y,
                x: x,
                theta: 0,
              },
              orientations: [],
              priority: 1,
            };
            item.points.map((c, i) => {
              // let array=[]
              // array.push(i)
              if (i === this.state.clickedCircle) {
                //break;
                obj1 = 0;
              }
              // else{

              // }

              return null;
            });
            if (obj1 !== 0) item.points.push(obj1);
            this.setState({
              patrols: patrols1,
              clickedCircle: "",
            });

            return null;
          });
        }

        this.setState({
          patrols,
        });
      }
    }
  }
  /********** Areas Manage **********/
  /* Get Areas */
  GetAreas() {
    ajax("GET", "robot/area", null, (responseArea) => {
      let obj = responseArea.areas;

      if (responseArea !== null) {
        if (responseArea.hasOwnProperty("areas")) {
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
        }
      } else {
        this.setState({
          areas: [],
        });
      }
    });
  }

  /*Add Area to API*/
  addArea(data) {
    if (this.state.areas) {
      const x = this.state.areas.map((item, key) => {
        let y = item.points;
        let arraylength = y.length;
        let area = this.state.areas;
        if (
          item.points[0].position.x !==
            item.points[arraylength - 1].position.x ||
          arraylength === 1
        ) {
          var index = area.indexOf(item);
          area.splice(index, 1);
          Swal.fire({
            text: i18n.get("Warning:Last area created is not valid"),
            showCancelButton: false,
            showConfirmButton: true,
          });
        }
        item.points.map((c, i) => {
          if (this.state.mapHeight > this.state.mapWidth) {
            const a = Number(parseFloat(c.position.x).toFixed(2));
            c.position.x = Number(parseFloat(c.position.y).toFixed(2));
            c.position.y = Number(
              parseFloat(this.state.mapHeight - a).toFixed(2)
            );
          } else {
            c.position.x = Number(parseFloat(c.position.x).toFixed(2));
            c.position.y = Number(parseFloat(c.position.y).toFixed(2));
          }

          this.setState({ areas: x });
          return null;
        });

        return null;
      });
      data = this.state.areas;
      const { port } = this.state.robotConfig;
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
          "/area",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ areas: data }),
        }
      )
        .then((response) => {
          if (response.ok) {
            this.GetAreas();
          }
        })
        .catch(function (error) {
          console.log(error.error);
        });
    }
  }

  /*CallBack to get clicked circle*/
  callbackFunction = (childData, childname) => {
    this.setState({ clickedCirclePatrol: childData });
    this.state.clickedCircleArea = childData;
    this.state.clickedCircle = childData;
    this.state.deleteAreaItem = childname;
  };
  callbackFunctionchecked = (
    checked_0,
    checked_45,
    checked_90,
    checked__90,
    checked__45,
    id
  ) => {
    this.props.parentCallbackchecked(
      checked_0,
      checked_45,
      checked_90,
      checked__90,
      checked__45,
      id
    );
  };
  /* Add graphic Area*/
  onMouseAddArea(x, y) {
    let areas = this.state.areas;
    if (areas) {
      if (
        this.props.display &&
        this.props.addRect &&
        !this.props.editArea &&
        !this.props.deleteOnce
      ) {
        this.setState({
          positionAreaX: x,
          positionAreaY: y,
        });

        const zonefini = localStorage.getItem("zonefini");
        const newzone = localStorage.getItem("newzone");
        if (
          _.isEmpty(areas) ||
          this.state.newArea === true ||
          zonefini === "true" ||
          newzone === "true" ||
          this.props.get === true
        ) {
          //this.props.onClickAddArea()
          //console.log(areas.length)
          this.handleDoubleClick();
          areas.push({
            points: [
              {
                position: {
                  y: y,
                  x: x,
                  theta: 0,
                },
                // orientations: [],
                priority: 1,
              },
            ],
            type: 0,
            name: "Area " + areas.length,
          });
          this.state.counterArea = areas.length - 1;
          // this.setState({
          //   areas,
          // });

          this.state.CircleArea1 = false;
          this.state.clickedCirclePatrol = -1;
          this.state.newArea = false;
          localStorage.setItem("zonefini", false);
          localStorage.setItem("newzone", false);
        } else {
          let areasNew = areas;

          areasNew.forEach((item, i) => {
            if (i === this.state.counterArea) {
              const objPoint = {
                position: {
                  y: y,
                  x: x,
                  theta: 0,
                },
                //  orientations: [],
                priority: 1,
              };
              item.points.push(objPoint);

              if (this.state.clickedCircleArea === 0) {
                let xFirst = item.points[0].position.x;
                let yFirst = item.points[0].position.y;
                this.state.xLast = item.points[0].position.x;
                this.state.yLast = item.points[0].position.y;

                item.points.pop();
                const objPointI = {
                  position: {
                    y: yFirst,
                    x: xFirst,
                    theta: 0,
                  },
                  // orientations: [],
                  priority: 1,
                };
                item.points.push(objPointI);
              }
            }

            /*this.setState({
              areas: areasNew,
            });*/
          });
        }

        if (this.state.clickedCircleArea === 0) {
          this.setState({
            counterArea: this.state.counterArea + 1,
            counter: this.state.counter + 1,
            newArea: true,
          });

          this.state.CircleArea1 = true;
          this.state.clickedCircleArea = -1;
          this.state.clickedCirclePatrol = -1;
          localStorage.setItem("zonefini", this.state.CircleArea1);
        }
        // this.setState({
        //   areas,
        // });
      }
    }
  }
  /* clear graphic Area*/
  DeleteArea = () => {
    if (this.state.areas) {
      this.setState({
        areas: this.state.areas.filter(
          (item, key) => key !== this.state.areaName
        ),
      });
    }
  };
  /* Clear all Areas */
  clearAllAreas() {
    this.setState({ areas: [] });

    let counter = this.state.counterArea;
    if (this.props.get === true) {
      this.setState({ counterArea: counter });
    } else {
      this.setState({ counterArea: 0 });
    }
  }
  onImageLoad = () => {
    this.setState({
      height: this.imgref.current.clientHeight,
      width: this.imgref.current.clientWidth,
    });
  };
  onClickedDragChange() {
    this.props.onClickedDragChange();
  }
  render() {
    const { mapWidth, goal_x, goal_y, id, x, y, mapHeight, patrols, areas } =
      this.state;
    const shouldDisplayMap = mapHeight && mapWidth;
    const shouldDisplayPatrol = patrols;
    const shouldDisplayArea = areas;
    let zones = null;

    zones =
      shouldDisplayArea &&
      areas.map((item, key) => {
        let arrayX = [];
        let arrayY = [];
        return item.points.map(
          (c, i) => (
            // eslint-disable-next-line
            arrayX.push(c.position.x),
            arrayY.push(c.position.y),
            (
              <g
                onClick={this.toggleHiddenArea.bind(
                  this,
                  i,
                  item,
                  c.position.theta,
                  key
                )}
              >
                <Polygone
                  prevAreaName={this.state.prevAreaName}
                  areaName={this.state.areaName}
                  onClickedDragChange={this.onClickedDragChange}
                  key={i}
                  xLast={this.state.xLast}
                  onReff={(ref) => (this.child = ref)}
                  item={item.points}
                  name={key}
                  // parentCallbackChecked={this.callbackFunctionchecked}
                  patrols={this.state.patrols}
                  GetPatrols={this.GetPatrols.bind(this)}
                  theta={c.position.theta}
                  parentCallback={this.callbackFunction}
                  deleteArea={this.DeleteArea}
                  area={this.state.areas}
                  update={this.state.update}
                  move={this.props.display}
                  x={c.position.x}
                  y={c.position.y}
                  id={i}
                  arrayX={arrayX}
                  arrayY={arrayY}
                  editArea={this.props.editArea}
                  delete={this.props.deleteOnce}
                  selected={this.state.selectedPointArea}
                  clickedDrag={this.props.clickedDrag}
                  prevSelected={this.state.prevSelected}
                  showbutton={this.props.showbutton}
                />
              </g>
            )
          )
        );
      });

    let points =
      shouldDisplayPatrol &&
      patrols.map((item, key) => {
        let arrayX = [];
        let arrayY = [];
        return item.points.map(
          (c, i) => (
            // eslint-disable-next-line
            arrayX.push(c.position.x),
            arrayY.push(c.position.y),
            (
              <g
                onClick={this.toggleHidden1.bind(
                  this,
                  i,
                  item,
                  c.position.theta,

                  key
                )}
              >
                <Circle
                  zoomDisabled={true}
                  showbutton={this.props.showbutton}
                  prevSelected={this.state.prevSelected}
                  selected={this.state.selected}
                  onClickedDragChange={this.onClickedDragChange}
                  //  panelButtonClicked={this.props.panelButtonClicked}
                  toggleHidden1={this.toggleHidden1.bind(this, i, item)}
                  parentCallback={this.callbackFunction}
                  //  parentCallbackChecked={this.callbackFunctionchecked}
                  clickedDrag={this.props.clickedDrag}
                  onReff={(ref) => (this.child = ref)}
                  orientations={c.orientations}
                  arrayDelete={this.state.arrayDelete}
                  patrols={this.state.patrols}
                  update={this.state.update}
                  move={this.props.display}
                  x={c.position.x}
                  y={c.position.y}
                  theta={c.position.theta}
                  id={i}
                  // xNew={this.state.xNew===c.position.x?"":this.state.xNew}
                  // yNew={this.state.yNew===c.position.y?"":this.state.yNew}
                  // idNew={this.state.idNew===i?"":this.state.idNew}
                  // thetaNew={this.state.thetaNew===c.position.theta?"":this.state.thetaNew}
                  arrayX={arrayX}
                  arrayY={arrayY}
                  edit={this.props.edit}
                  delete={this.props.delete}
                  height={this.state.height}
                  width={this.state.width}
                />
              </g>
            )
          )
        );
        // } else return ""
      });
    if (shouldDisplayMap) {
      return (
        <div
          id="map-container"
          ref={this.imgref}
        >
          {
            <ReactSVGPanZoom
              width={this.state.width !== "" ? this.state.width : null}
              height={this.state.height !== "" ? this.state.height : null}
              detectWheel={true}
              tool={this.props.display === true ? "none" : "pan"}
              miniaturePosition={"left"}
              toolbarPosition={"left"}
              toolbarProps={"center"}
              ref={(map) => (this.map = map)}
              //onClick={this.onClickHandler(e,e1)}
              // eslint-disable-next-line
              onDoubleClick={this.props.display === true ? (event) => { this.onMouseMove(event.x, event.y) & this.onMouseAddArea(event.x, event.y);}: null
              }
              // onClick={(event) => {this.setState({clic:true})&console.log("clic simple",this.state.selected)}}
              // onDoubleClick={
              //   this.props.display&&this.props.addCircle?
              //   (event) => {this.onMouseMove(event.x, event.y) }:
              //   this.props.display&&this.props.addRect&&!this.props.deleteOnce? (event) => {
              //     this.onMouseAddArea(event.x, event.y)
              //   }:null
              // }
              background="transparent"
              SVGBackground="transparent"
            >
              {mapHeight > mapWidth ? (
                <svg width={mapHeight} height={mapWidth}>
                  <g>
                    <svg style={{ visibility: "hidden" }}>
                      <image href="/api/robot/map" x="0" y="0" />
                    </svg>

                    <image href="map.png"></image>
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
                  )}

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

                  {zones}

                  {points}
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
              ) : (
                <svg width={mapWidth} height={mapHeight}>
                  <g>
                    <image href="api/robot/map"></image>
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
                  )}

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

                  {zones}
                  {points}
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
              )}
            </ReactSVGPanZoom>
          }
        </div>
      );
    } else
      return (
        <div id="map-container">
          <Loading />
        </div>
      );
  }
}

export default MapComponent;