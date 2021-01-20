# CustomComponents

RatingCircular.js:
-----------------

A Custom Rating slider, works both on Android & iOS:

![grab-landing-page](https://github.com/JamzWork/CustomComponents/blob/main/rating%20slider.gif)

Installation: <br />
------------ <br />
<br /> Please install following libraries before using:
<br /> npm install --save react-native-svg prop-types 
<br />
<br /> Usage: 
<br /> -----
<br /> 
<br /> <RatingCircular  width={250} height={250} />


DaysCircularSlider.js:
---------------------

A Custom Circular slider for days selection, works both on Android & iOS:

![grab-landing-page](https://github.com/JamzWork/CustomComponents/blob/main/ezgif-4-9c077d095e0f.gif)

Installation: <br />
------------ <br />
<br /> Please install following libraries before using:
<br /> npm install --save react-native-svg prop-types
<br />
<br /> Usage: 
<br /> -----
<br /> 
<br /> <DaysCircularSlider   
  width={200}   <br />
  height={200}  <br />
  MaxDays={10}  <br />
  value={35}   <br />
  onValueChange={(value)=>this.setState({currentValue:value})}/>
