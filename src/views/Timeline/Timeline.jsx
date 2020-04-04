import React, { Component } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import Konva from 'konva';
import { Stage, Layer, Star, Text, Line } from 'react-konva';
import NavigationBar from '../NavigationBar/NavigationBar';
import Songs from './../../containers/SongsContainer';
import TextMoment from '../../components/TextMoment/TextMoment';
import AddMoment from '../../components/AddMoment/AddMoment';
import './Timeline.scss';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.stageRef = React.createRef();
    this.layerRef = React.createRef();

    // Temporary height of the simulated timeline
    // Amount of innerHeight
    this.xHeight = 5;

    this.testRef = React.createRef();

    // Initial State
    this.state = {
      sWidth: window.innerWidth,
      sHeight: window.innerHeight,
      stageScaleX: 1,
      stageScaleY: 1,
      lastDist: 0,
      touchStartPositionY: 0,
      scalingFactor: 6,
      layer: {
        x: 0,
        y: 0,
        scrollPosition: 0,
      },
      moments: [
        {
          key: 12314,
          x: 0.7,
          y: window.innerHeight * 0.15,
          text: `Drag me${500}`,
          hidden: false,
          size: 0.2,
        },
      ],
    };
  }

  static getDistance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  componentDidMount() {
    this.stageRef.container().style.cursor = 'pointer';

    const moments = [...Array(0)].map((_, i) => {
      const xPosition = Math.random() * (0.8 - 0.2) + 0.2;
      const newMoment = {
        key: i,
        x: xPosition,
        y: Math.random() * window.innerHeight * this.xHeight,
        text: `A Happy Moment ${parseInt(xPosition * 100, 10)}`,
        hidden: false,
        size: Math.abs(xPosition - 0.5),
      };

      return newMoment;
    });

    this.setState({
      moments,
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateDimensions();
    });
  }

  onTextDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 1,
        y: 1,
      },
      fill: 'grey',
      scaleX: 1.3,
      scaleY: 1.3,
    });
  };

  onTextDragMove = e => {
    const momentID = e.currentTarget.attrs.id;

    /* // DELETE ITEM REFERENCE
      const updatedMoments = this.state.moments.filter((item, i) => i !== momentID);
      const [first, ...updatedMoments] = this.state.moments;
      let updatedMoment = {}
      Object.assign(updatedMoment, first)
      updatedMoment.x = 666
      updatedMoments.concat(updatedMoment) */

    // Calculating distance to central axis to increase/decrease Moment size
    const { moments } = this.state;
    const size = Math.abs(this.stageRef.getPointerPosition().x - window.innerWidth / 2) / window.innerWidth;

    const updatedMoments = moments.map((moment, i) => {
      if (i === momentID) {
        const updatedMoment = {};
        Object.assign(updatedMoment, moment);
        updatedMoment.x = this.stageRef.getPointerPosition().x / window.innerWidth;
        updatedMoment.y = this.stageRef.getPointerPosition().y - this.layerRef.y();
        updatedMoment.size = size;
        return updatedMoment;
      }
      return moment;
    });
    this.setState({
      moments: updatedMoments,
    });
  };

  textDragMove = () => {};

  onTextDragEnd = e => {
    e.target.to({
      duration: 0.35,
      easing: Konva.Easings.BackEaseOut,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      fill: 'white',
    });
  };

  starDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  starDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 0.5,
      scaleY: 0.5,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  onDblClick = e => {
    const { moments } = this.state;
    const momentID = parseInt(e.currentTarget.parent.attrs.id, 10);
    const updatedMoments = moments.map((moment, i) => {
      if (i === momentID) {
        const updatedMoment = {};
        Object.assign(updatedMoment, moment);
        updatedMoment.hidden = !updatedMoment.hidden;
        return updatedMoment;
      }
      return moment;
    });

    this.setState({
      moments: updatedMoments,
    });
  };

  onKeyDown = e => {
    const { moments } = this.state;
    // When pressing enter
    if (e.keyCode === 13) {
      const momentID = parseInt(e.currentTarget.id, 10);

      const updatedMoments = moments.map((moment, i) => {
        if (i === momentID) {
          const updatedMoment = {};
          Object.assign(updatedMoment, moment);
          updatedMoment.hidden = !updatedMoment.hidden;
          return updatedMoment;
        }
        return moment;
      });

      this.setState({
        moments: updatedMoments,
      });
    }
  };

  onTextChange = e => {
    const { moments } = this.state;
    const momentID = parseInt(e.currentTarget.id, 10);

    const updatedMoments = moments.map((moment, i) => {
      if (i === momentID) {
        const updatedMoment = {};
        Object.assign(updatedMoment, moment);
        updatedMoment.text = e.target.value;
        return updatedMoment;
      }
      return moment;
    });

    this.setState({
      moments: updatedMoments,
    });
  };

  onStageTouchStart = e => {
    this.setState({
      touchStartPositionY: e.evt.touches[0].clientY,
    });
  };

  onStageTouchMove = e => {
    e.evt.preventDefault();
    const {
      stageScaleX,
      lastDist,
      touchStartPositionY,
      layer: { x, y, scrollPosition },
    } = this.state;
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    // Check if pinch zoom, if two fingers used
    if (touch1 && touch2) {
      const dist = Timeline.getDistance(
        {
          x: touch1.clientX,
          y: touch1.clientY,
        },
        {
          x: touch2.clientX,
          y: touch2.clientY,
        },
      );

      if (!lastDist) {
        this.setState({
          lastDist: dist,
        });
      }

      const scale = (stageScaleX * dist) / lastDist;
      this.setState({
        stageScaleX: scale,
        stageScaleY: scale,
        lastDist: dist,
      });
    } else {
      // When only one touch, the user is scrolling up "step"
      const scroll = 35;
      const touchMoveY = e.evt.changedTouches[0].clientY;
      if (touchStartPositionY < touchMoveY - 1) {
        // Scrolling up - Sliding down
        this.setState({
          layer: {
            x,
            y: y + scroll,
            scrollPosition: scrollPosition + scroll,
            touchStartPositionY: e.evt.changedTouches[0].clientY,
          },
        });
      } else if (touchStartPositionY > touchMoveY + 1) {
        // Scrolling down - Sliding up
        this.setState({
          layer: {
            x,
            y: y - scroll,
            scrollPosition: scrollPosition - scroll,
            touchStartPositionY: e.evt.changedTouches[0].clientY,
          },
        });
      }
    }
  };

  onStageWheel = e => {
    const {
      layer: { x, y, scrollPosition },
    } = this.state;
    // Scrolling "step"
    const scroll = 35;

    if (e.evt.deltaY < 0) {
      // Scrolling up
      this.setState({
        layer: {
          x,
          y: y + scroll,
          scrollPosition: scrollPosition + scroll,
        },
      });
    } else if (e.evt.deltaY > 0) {
      // Scrolling down
      this.setState({
        layer: {
          x,
          y: y - scroll,
          scrollPosition: scrollPosition - scroll,
        },
      });
    }
  };

  addMoment = () => {
    const { moments } = this.state;
    const newMoment = {
      x: Math.random(),
      y: window.innerHeight * Math.random() - this.layerRef.y(),
      text: 'New Moment',
      hidden: true,
    };

    const updatedMoments = moments.concat(newMoment);
    this.setState({
      moments: updatedMoments,
    });
  };

  updateDimensions = () => {
    this.setState({
      sWidth: window.innerWidth,
      sHeight: window.innerHeight,
    });
  };

  render() {
    const {
      stageScaleY,
      sWidth,
      sHeight,
      moments,
      scalingFactor,
      layer: { y, scrollPosition }
    } = this.state;
    return (
      <div className="App">
        <NavigationBar />
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              ref={ref => {
                this.stageRef = ref;
              }}
              onWheel={this.onStageWheel}
              onTouchStart={this.onStageTouchStart}
              onTouchMove={this.onStageTouchMove}
              scaleY={stageScaleY}
              width={sWidth}
              height={sHeight * 1}
            >
              <Provider store={store}>
                <Songs layerY={y}></Songs>
              </Provider>
              <Layer
                ref={ref => {
                  this.layerRef = ref;
                }}
                y={y}
              >
                {[...Array(30)].map(() => {
                  const starSize = Math.random();
                  return (
                    <Star
                      key={Math.random()}
                      x={Math.random() * window.innerWidth}
                      y={Math.random() * this.xHeight * window.innerHeight}
                      numPoints={5}
                      innerRadius={10}
                      outerRadius={20}
                      scale={{ x: 1.5 - starSize, y: 1.5 / stageScaleY - starSize }}
                      // scale={{x:1.5 - starSize, y:1.5 - starSize}}
                      fill="#0269A4"
                      opacity={0.8}
                      draggable
                      shadowColor="black"
                      shadowBlur={10}
                      shadowOpacity={0.6}
                      onDragStart={this.starDragStart}
                      onDragEnd={this.starDragEnd}
                    />
                  );
                })}
                <Line x={0} y={0} points={[sWidth / 2, 0, sWidth / 2, window.innerHeight * 5]} stroke="grey" />
                {moments.map((_, i) => (
                  <TextMoment
                    key={moments[i].key}
                    id={moments[i].key}
                    text={moments[i].text}
                    hidden={moments[i].hidden}
                    x={moments[i].x * sWidth}
                    y={moments[i].y}
                    scrollPosition={scrollPosition}
                    onDragMove={this.onTextDragMove}
                    onDragStart={this.onTextDragStart}
                    onDragEnd={this.onTextDragEnd}
                    onDblClick={this.onDblClick}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onTextChange}
                    scaleX={1 + moments[i].size * scalingFactor}
                    scaleY={(1 + moments[i].size * scalingFactor) / stageScaleY}
                  />
                ))}
                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2013"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={25}
                />

                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2014"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={525}
                />

                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2015"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={1025}
                />

                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2016"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={1525}
                />

                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2017"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={2025}
                />

                <Text
                  ref={ref => {
                    this.testRef = ref;
                  }}
                  text="2018"
                  fill="grey"
                  fontSize={22}
                  scaleY={1 / stageScaleY}
                  x={window.innerWidth / 2 - 60}
                  y={2525}
                />
              </Layer>
              <Layer>
                <Line
                  absolutePosition={{
                    x: sWidth / 2,
                    y: window.innerHeight - 85,
                  }}
                  points={[0, 0, 0, 85]}
                  stroke="#00000099"
                />
                <AddMoment onClick={this.addMoment} scaleY={1 / stageScaleY} />
              </Layer>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}

export default Timeline;
