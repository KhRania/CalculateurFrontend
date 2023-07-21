import React from "react";
import "../css/circle.css";

class Polygone extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
      id: this.props.id,
      name: this.props.name,
      arrayY: this.props.arrayY,
      arrayX: this.props.arrayX,
      clickedCircle: -1,
      xclickedCircle: -1,
      yclickedCircle: -1,
      patrols: this.props.patrols,
      areas: this.props.area,
      polyline: "",
      radius: "7",
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    //this.deletePoint=this.deletePoint.bind(this)
    this.child = React.createRef();
  }
  /* componentWillUpdate(){
    this.PostPointedit();
  } */
  componentDidMount() {
    //this._isMounted = true;
    this.generatePolylineArray();
    this.props.onReff(this);
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("touchstart", this.handleMouseMove, {
      passive: true,
    });
  }
  componentWillUnmount() {
    //this._isMounted = false;
    this.props.onReff(undefined);
    document.removeEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("touchstart", this.handleMouseMove, {
      passive: true,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.state.x !== nextProps.x ||
      this.state.y !== nextProps.y ||
      this.state.name !== nextProps.name ||
      this.state.id !== nextProps.id
    )
      this.setState({
        x: nextProps.x,
        y: nextProps.y,
        name: nextProps.name,
        id: nextProps.id,
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.arrayX !== this.props.arrayX ||
      prevState.arrayY !== this.props.arrayY
    ) {
      this.generatePolylineArray();
    }
  }
  generatePolylineArray() {
    let polyline = "";
    this.props.arrayX.map((coordX, i) => {
      return (polyline += `${coordX}, ${this.props.arrayY[i]} `);
    });
    this.setState({
      polyline,
    });
  }
  handleDoubleClick = (h) => {
    this.props.parentCallback(h, this.props.name);
    // eslint-disable-next-line
    this.state.clickedCircle = h;
  };
  handleMouseClick = () => {
    this.coords = {};
  };
  handleMouseDown = (e) => {
    this.dragging =
      (this.state.id === this.props.selected &&
        this.state.name === this.props.areaName) ||
      (this.props.clickedDrag &&
        this.state.id === this.props.selected &&
        this.state.name === this.props.areaName);
    this.coords = {
      x: e.pageX,
      y: e.pageY,
    };
    window.addEventListener("mouseup", this.handleMouseUp, true);
  };
  handleMouseUp = () => {
    this.dragging = false;
    this.coords = {};
    window.removeEventListener("mouseup", this.handleMouseUp, true);
  };
  handleMouseClick = () => {
    this.coords = {};
  };
  handleMouseMove = (e) => {
    if (this.dragging) {
      e.preventDefault();
      const xDiff = this.coords.x - e.pageX;
      const yDiff = this.coords.y - e.pageY;
      this.coords.x = e.pageX;
      this.coords.y = e.pageY;
      this.setState({
        x: this.state.x - xDiff,
        y: this.state.y - yDiff,
      });
      if (this.state.areas) {
        this.props.area.map((item, i) => {
          let area = item.points;
          let pointInitial = item.points[0];
          let lastElement = area.length;
          item.points.map((obj, j) => {
            if (j === this.state.id && i === this.state.name) {
              if (j === lastElement - 1) {
                pointInitial.position.x = Number(
                  parseFloat(this.state.x).toFixed(2)
                );
                pointInitial.position.y = Number(
                  parseFloat(this.state.y).toFixed(2)
                );
              }
              obj.position.x = Number(parseFloat(this.state.x).toFixed(2));
              obj.position.y = Number(parseFloat(this.state.y).toFixed(2));
              // this.setState({ patrols:this.state.patrols })
            }
            return null;
          });
          return null;
        });
      }
      this.setState({ areas: this.state.areas });
    }
  };
  DeleteArea = () => {
    this.props.deleteArea();
  };

  drawCircle() {
    if (this.props.item) {
      return this.props.item.map((t, h) => (
        <g key={h} onDoubleClick={() => this.handleDoubleClick(h)}>
          <circle
            r={this.props.xLast === t.position.x ? "30" : "10"}
            fill={
              this.props.xLast === t.position.x || h === 0 ? "green" : "#FF0000"
            }
            stroke={h === 0 ? "none" : "#FF0000"}
            strokeWidth={this.props.xLast === t.position.x ? "4" : "1"}
            cx={t.position.x}
            cy={t.position.y}
          />
        </g>
      ));
    }
  }
  onCancel() {
    this.props.GetPatrols();
  }
  onConfirm() {}
  // InputChangetheta = (e,id) => {
  //   this.state.patrols.map((item, key) => {
  //     item.points.map((c, i) => {
  //       let point = item.points[id].position;
  //       if (i === id) {
  //         let value = Number(e.target.value);
  //         point.theta = value;
  //       }return null
  //     });return null
  //   });
  // };
  // handleChecked =(id) => {
  //   this.state.patrols.map((item, key) => {
  //      item.points.map((c,i)=>{
  //        let point = item.points[id]

  //      if (i === id){
  //        this.setState({ checked_0: false ,checked_45: false,checked_90: false,checked_135:false,checked__135:false,checked__45: false,checked__90: false,checked_180:false}, function () {
  //        });
  //        if (_.isEmpty(point.orientations) ){
  //          this.setState({ checked_0: false ,checked_45: false,checked_90: false,checked_135:false,checked__135:false,checked__45: false,checked__90: false,checked_180:false}, function () {
  //            this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //          });        }
  //        else{
  //        point.orientations.map((ckecked)=>{

  //          if(ckecked === 0 ){
  //            this.setState({ checked_0: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === 45 ){
  //            this.setState({ checked_45: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === 90 ){
  //            this.setState({ checked_90: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === 135 ){
  //            this.setState({ checked_135: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === 180 ){
  //            this.setState({ checked_180: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === -135 ){
  //            this.setState({ checked__135: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //          if(ckecked === -90 ){
  //            this.setState({ checked__90: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }

  //          if(ckecked === -45 ){
  //            this.setState({ checked__45: true }, function () {
  //              this.props.parentCallbackChecked(this.state.checked_0,this.state.checked_45,this.state.checked_90,this.state.checked_135,this.state.checked_180,this.state.checked__135,this.state.checked__90,this.state.checked__45,id)
  //            });

  //          }
  //         return null});return null}};return null}); return null})
  //  }
  //      handleChange = (event,id) => {
  //       this.state.patrols.map((item, key) => {
  //         item.points.map((c,i)=>{
  //           let point = item.points[id]

  //   if (i=== id){

  //       if(event.target.checked === true){
  //   if(point.orientations){

  //   point.orientations.push(Number(event.target.value))}

  //     }

  //     else {
  //       if(point.orientations){
  //       var index = point.orientations.indexOf(Number(event.target.value))
  //     if (index !== -1) {
  //       point.orientations.splice(index, 1);
  //       //t}his.setState({orientations: this.state.orientations});
  //     }}}
  //   };return null });
  //   return null ;});

  //     }
  //     onchangetheta = (e,id) => {
  //       this.state.patrols.map((item, key) => {
  //         item.points.map((c,i)=>{
  //           let point = item.points[id].position
  //                   if (i === id){

  //     let value = e.target.value

  //   point.theta = value

  //   }return null
  // });return null})

  //   }
  render() {
    const { x, y, id, radius } = this.state;
    if (this.props.editArea) {
      return (
        // eslint-disable-next-line

        <g>
          <polyline
            fill={"none"}
            stroke="#FF0000"
            points={this.state.polyline}
            strokeDasharray="5 10"
            strokeWidth="1"
          />
          {id !== 0 ? (
            <g
              draggable="true"
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              style={{ cursor: "pointer" }}
            >
              <circle
                r={radius}
                fill={"#FF0000"}
                stroke={"#FF0000"}
                strokeWidth={this.props.xLast === x ? "4" : "1"}
                cx={x}
                cy={y}
              />
              {this.props.showbutton === true &&
              id === this.props.selected &&
              this.props.areaName === this.props.name ? (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fillOpacity="0"
                  stroke="#E1EB10"
                  strokeWidth="20px"
                  strokeOpacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="10"
                    to="30"
                    dur="6s"
                    repeatCount="indefinite"
                    begin="0.05s"
                  />
                </circle>
              ) : null}
              {
                <g>
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    //    id="circleSvg"
                    fontSize="9"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    {id}
                  </text>
                </g>
              }
            </g>
          ) : null}
        </g>
      );
    }
    if (this.props.delete) {
      return (
        // eslint-disable-next-line
        <g key={id} onDoubleClick={this.DeleteArea}>
          <circle
            r={"10"}
            fill={"#FF0000"}
            opacity="0.2"
            stroke={"#FF0000"}
            strokeWidth={1}
            cx={x}
            cy={y}
          />
          <polyline
            fill={"#FF0000"}
            fillOpacity="0.1"
            opacity="0.09"
            stroke="#FF0000"
            points={this.state.polyline}
            strokeWidth="4"
          />
        </g>
      );
    } else {
      return (
        <g className="parent">
          <g>
            <polyline
              className="child1"
              fill={"#FF0000"}
              fillOpacity="0.03"
              stroke="#FF0000"
              points={this.state.polyline}
              strokeWidth="4"
            />
          </g>
          {this.drawCircle()}
        </g>
      );
    }
  }
}
export default Polygone;