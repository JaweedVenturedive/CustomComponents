import React,{ Component} from 'react'
import {PanResponder, Animated} from 'react-native'
import Svg,{Path,Circle,G,Text} from 'react-native-svg'
import PropTypes from 'prop-types';

class DaysCircularSlider extends Component {

  static propTypes = {
    MaxDays : PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    meterColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    MaxDays: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  static defaultProps = {
    MaxDays: 10,
    width: 200,
    height: 200,
    meterColor:'#BF038A',
    textColor:'#fff',
    MaxDays:10,
    value:35
  };

  constructor(props){
    super(props)
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const {width,height} = props
    const smallestSide = (Math.min(width,height))

    const calCulatedMaxDays = 359 / this.props.MaxDays;

    this.state = {
      cx: width/2,
      cy: height/2,
      r: (smallestSide/2)*0.85,
      shouldMove: true,
      hasCrossed:false,
      passed350 : false,
      MaxDays: calCulatedMaxDays
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.shouldMove,
      onMoveShouldSetPanResponder: () => this.state.shouldMove,
      onPanResponderMove:  this.handlePanResponderMove
    })
  }
 
  polarToCartesian(angle){
    const {cx,cy,r} = this.state
        , a = (angle-270) * Math.PI / 180.0
        , x = cx + (r * Math.cos(a))
        , y = cy + (r * Math.sin(a))
    return {x,y}
  }
  cartesianToPolar(x,y){
    const {cx,cy} = this.state
    return Math.round((Math.atan((y-cy)/(x-cx)))/(Math.PI/180)+((x>cx) ? 270 : 90))
  }
  handlePanResponderMove({nativeEvent:{locationX,locationY}}){
    const {cx,cy} = this.state
    let angle = this.cartesianToPolar(locationX,locationY);
   
    if(angle < 350)
    {
      console.log(''+angle)
      this.state.hasCrossed && this.state.passed350 ? this.props.onValueChange(359) : this.props.onValueChange(angle);
    }
    else{
      console.log('inside '+angle)
      this.props.onValueChange(359)
       this.setState({hasCrossed:true}) 
    }

    if(angle > 200){
      this.setState({passed350 : true});
    }
      
  }
  render(){
   
    const {width,height,value,meterColor,textColor,onValueChange} = this.props
        , {cx,cy,r} = this.state
        , startCoord = this.polarToCartesian(0)
        , endCoord = this.polarToCartesian((value > 359 ? 359 : value))
        const vaalee = (value > 359 ? 359 : value);
    return (
      <Svg onLayout={this.onLayout} width={width} height={height}>
         
           <Text    x={'45%'} y={'53%'} fill={'#000000'} fontSize={40} textAnchor="middle"> {Math.floor(value/this.state.MaxDays)}</Text>
           <Text    x={'48%'} y={'63%'} fill={'#000000'} textAnchor="middle"> Days</Text>
         
         <Circle cx={cx} cy={cy} r={r} stroke='grey' strokeWidth={0.5} fill='none'/>
        <Path stroke={meterColor} strokeWidth={8} fill='none'
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${vaalee>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}/>
         
           <G scale='1.0' x={endCoord.x-7.5} y={endCoord.y-7.5}  >
                <Circle cx={7.5} cy={7.5} r={14} fill={meterColor}  {...this._panResponder.panHandlers}  />
                <Text  key={value+''} x={7.5} y={16} fontSize={30} fill={textColor} textAnchor="middle" onPress={()=>  {
                  this.state.hasCrossed && this.state.passed350 ? this.props.onValueChange(value+this.state.MaxDays) :   console.log('asdf')   } 
               } >{' + '}</Text>
           </G>
       
        {
          value > 358 && <G x={width/2 - 10} y={10} onPress={()=>  {
            this.props.onValueChange(value-this.state.MaxDays) ,
            this.setState({hasCrossed:false,passed350:false}) } 
         }>
            <Circle cx={7.5} cy={7.5} r={14} fill={meterColor}  />
            <Text key={'-'} x={7.5} y={17} fontSize={30} fill={textColor} textAnchor="middle">{'-'}</Text>
          </G>
        }
      </Svg>
    )
  }
}

export default DaysCircularSlider
