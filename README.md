# CustomComponents


DaysCircularSlider.js:
----------------------

A Custom Circular slider for days selection:


Please install following libraries before using:
npm install --save react-native-svg
npm install --save prop-types

Usage:
-------

SIMPLE:

<DaysCircularSlider />


WITH PROPS:

<DaysCircularSlider 
    width={200} 
    height={200}
    MaxDays={10}
    value={35} 
    onValueChange={(value)=>this.setState({currentValue:value})}/>
