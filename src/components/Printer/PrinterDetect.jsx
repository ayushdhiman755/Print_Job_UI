import React from "react";

export default function PrinterDetect() {
    const der=async (e)=>{
        const res=await navigator.usb.getDevices();
        console.log(res);
    }
  return (
    <div>
      <button onClick={der}>Detect</button>
    </div>
  );
}
