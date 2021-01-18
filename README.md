# CustomComponents


DaysCircularSlider.js:
---------------------

A Custom Circular slider for days selection, works both on Android & iOS:

![grab-landing-page](https://github.com/JamzWork/CustomComponents/blob/main/ezgif-4-9c077d095e0f.gif)

Installation:
------------

Please install following libraries before using:
npm install --save react-native-svg
npm install --save prop-types

Usage:
-----

SIMPLE:

<DaysCircularSlider />


WITH PROPS:

<DaysCircularSlider 
    width={200} 
    height={200}
    MaxDays={10}
    value={35} 
    onValueChange={(value)=>this.setState({currentValue:value})}/>
