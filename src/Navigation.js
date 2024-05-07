
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import DarkModeToggle from './DarkModeToggle';
import DarkModeCommands from './DarkModeCommands';
import DarkModeStatus from './DarkModeStatus';
import Content from './Content';
import './style.css';

import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function Navigation({onNavigate}) {
  const [currentPage, setCurrentPage] = useState('Navigation');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
function handle(){
 onNavigate('Mainweather')
}

  /*function onNavigate(){
    handleNavigation('weatherupdate')
  console.log('Its inside the navigation function after login')
  }
  const handleNavigation = (page) => {
    console.log("Im inside naviagte page and page value after clicking weather button: ", page)
    setCurrentPage(page);
  };*/
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <ChakraProvider>
      <div className={darkMode ? 'dark' : 'light'}>
        <div className="navbar">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <DarkModeStatus />
        </div>
        <Content
          darkMode={darkMode}
          map={map}
          setMap={setMap}
          directionsResponse={directionsResponse}
          setDirectionsResponse={setDirectionsResponse}
          distance={distance}
          setDistance={setDistance}
          duration={duration}
          setDuration={setDuration}
          originRef={originRef}
          destinationRef={destiantionRef}
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
        />
        <div className="map-container">
          {isLoaded && (

<GoogleMap
center={center}
zoom={15}
mapContainerStyle={{
  width: '100%',
  height: '700px',
  filter: darkMode ? 'invert(1)' : 'none', // Apply filter for dark mode
}}
onLoad={map => setMap(map)}
>
<Marker position={center} />
{directionsResponse && (
  <DirectionsRenderer directions={directionsResponse} />
)}
</GoogleMap>
)}
</div>
</div>
</ChakraProvider>

      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
          
        </HStack>
        <button className='wstyle' onClick={handle}>Weather</button>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Navigation