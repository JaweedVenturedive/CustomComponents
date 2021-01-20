import React,{ Component} from 'react'
import {PanResponder, Image} from 'react-native'
import Svg,{SvgCss,Path,Circle,G,Text} from 'react-native-svg'
import PropTypes from 'prop-types';
import Images from '../Utils/ImageUtils'; 
import sliderBtn from '../Assets/SvgFiles/sliderbtn';

class RatingCircular extends Component {

  static propTypes = { 
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    meterColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired, 
    value: PropTypes.number.isRequired,
  };
  static defaultProps = { 
    width: 200,
    height: 200,
    meterColor:'#BF038A',
    textColor:'#fff', 
    value:35
  };

  constructor(props){
    super(props)
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const {width,height} = props
    const smallestSide = (Math.min(width,height))

    this.state = {
      cx: width/2,
      cy: height/2,
      r: (smallestSide/2)*0.85,
      shouldMove: true,
      hasCrossed:false,
      passed350 : false, 
      angle:0
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.shouldMove,
      onMoveShouldSetPanResponder: () => this.state.shouldMove,
      onPanResponderMove:  this.handlePanResponderMove
    })
  }
 
  polarToCartesian(angle){
    const {cx,cy,r} = this.state
        , a = (angle-90) * Math.PI / 90
        , x = cx + (r * Math.cos(a))
        , y = cy + (r * Math.sin(a))
    return {x,y}
  }
  
  cartesianToPolar(x,y){
    const {cx,cy} = this.state
    return Math.round((Math.atan((y-cy)/(x-cx)))/(Math.PI/90)+((x>cx) ? -90 : 0))
  }

  handlePanResponderMove({nativeEvent:{locationX,locationY}}){ 
    let angle = this.cartesianToPolar(locationX,locationY); 
     
    if(angle > -85)
    { 
      if(angle != 45 )
         this.props.onValueChange(angle);
    }
    else { 
      if(angle != 40 )
         this.props.onValueChange(-89) 
    }

    if(angle > -5){ 
      if(angle != 45 )
          this.props.onValueChange(0) 
    }
     
    this.setState({angle});
  }

  
  render(){
    const {width,height,value} = this.props
        , {r} = this.state
        , startCoord = this.polarToCartesian(0)
        , endCoord = this.polarToCartesian((value > 179 ? 179 : value))
        const vaalee = (value > 179 ? 179 : value);
  
    const BtnCircleRadius = 17; 
    let color = 'red';
    let emotionType='';
    let emotionIcon = Images.Icon_Sad;

    if(this.state.angle > -30){
      emotionType='Sad'; color = 'red'; emotionIcon = Images.Icon_Sad;
    }
    else if(this.state.angle > -50 || this.state.angle > -69){
      emotionType='Neutral'; color = 'orange'; emotionIcon = Images.Icon_Neutral;
    }
    else if(this.state.angle > -70 || this.state.angle > -150){
      emotionType='Happy'; color = 'green'; emotionIcon = Images.Icon_Happy;
    }
   
    return (
      <Svg class="center" onLayout={this.onLayout} width={width} height={height+10}>
        <Text x={'7%'} y={'40%'} fill={'#000000'} fontSize={15} textAnchor="middle"> SAD </Text>
        <Text x={'90%'} y={'41%'} fill={'#000000'} fontSize={15} textAnchor="middle"> HAPPY </Text>
        <Text x={'50%'} y={'100%'} fill={'#000000'} fontSize={15} textAnchor="middle"> NEUTRAL </Text>
        <Image
          style={{width:100,height:100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',marginTop:85}}
          source={emotionIcon}
        />
        <Path d={"M19,125 a1,1 0 0,0 212,0"} fill="none" stroke='grey' strokeWidth={0.5} />
         
        <Path stroke={color} strokeWidth={8} fill='none' 
          d={`M${endCoord.x} ${endCoord.y} A ${r} ${r} 0 ${vaalee>180?1:0} 1 ${startCoord.x} ${startCoord.y}`}/>
         
           <G scale='1.0' x={endCoord.x-15.5} y={endCoord.y-15.5} file='#fff'  >
              <SvgCss  xml={sliderBtn({color:color} )}  /> 
              <Circle cx={12.5} cy={12.5} r={BtnCircleRadius}  {...this._panResponder.panHandlers} />
           </G>
      </Svg>
    )
  }
}

export default RatingCircular
