import React from "react";
import "../css/Navbar.css"

class Navbar extends React.Component{
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
            
        }
         this.stateId = "";
    }


     // if there is no notification then iPod logo, time and battery icon
    // If there is a notification show it for 1 second and clear it
    componentDidMount() {
        const { noty} = this.props;
        if (noty === true) {
            return;
        }
        // set an interval of 60 seconds to update time
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 60000);
    }

    componentDidUpdate(){
        const {setNoty, noty } = this.props;
        if(noty===true){
            setTimeout(function () {
                setNoty();
            },1000)
        }
    }


    
    // Clear the update time interval
    componentWillUnmount() {
        const { noty } = this.props;
        if (noty !== true)
            clearInterval(this.stateId);
    }
    getCurrentTime() {
        const Today = new Date();
        var time = Today.getHours() + ":" + Today.getMinutes();
        if (Today.getMinutes() < 10) {
            time= Today.getHours() + ":0" + Today.getMinutes()
        }
        return time
    }

    render() {
        const { time } = this.state
        const { playing, noty , notifyText} = this.props;
        return (
            // <>
                <div className="bar">
                    <h1 className="heading">khushi's ipod</h1>
                    {noty === true && <h5 className="notification">{notifyText}</h5>}
                <h3 className="time"><span>{time}</span>
                                     <span>  {playing ? <p className="play-pause-nav"><i className="fas fa-play"></i></p> : <p className="play-pause-nav"><i className="fas fa-pause"></i> </p>}</span>  

                    </h3>
                </div>
            /* </> */
        )
    }
}
export default Navbar