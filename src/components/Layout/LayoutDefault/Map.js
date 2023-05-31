
import { withGoogleMap, withScriptjs, GoogleMap,Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const options = { closeBoxURL: '', enableEventPropagation: true };

const Map = () => {
    const key ="AIzaSyBRNmmbPd4Xdl1svuvYg84m75mSMo5vEyY"
    return (<>
         <div>
      <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: 21.051644, lng: 105.804702 }}
        >
             <Marker
              icon={{
                url: 'https://res.cloudinary.com/duytmd7ue/image/upload/v1683626968/sbcnirkb2uigjukclsp2.png',
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              position={{ lat: 21.051644, lng: 105.804702 }}
          >
             <InfoBox
              options={options}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                  CSV
                </div>
              </>
            </InfoBox> 
            </Marker>
           
      </GoogleMap>
    </div>
        </>  );
}
 
export default withScriptjs(withGoogleMap(Map));