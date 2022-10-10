import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'



import MarineDriveBackground from '../assets/images/marineDriveBackground.jpg'
import MainamatiBg from '../assets/images/mainamatibground.png'
import HardingeBridgeBg from '../assets/images/hardingeBridgeBground.png'
import BandorbanBground from '../assets/images/bandorbanBground.png'

export let eventSchedules = [
    {
        id: 0,
        timeToShow: 2,
        timeToHide: 5,
        modalBackground: MarineDriveBackground,
        // modalComponent: <Modal1 />,
        hotSpotComponent: <HotSpot1 />
    },
    {
        id: 1,
        timeToShow: 6,
        timeToHide: 10,
        modalBackground: HardingeBridgeBg,
        // modalComponent: <Modal2 />,
        hotSpotComponent: <HotSpot2 />
    },
    {
        id: 2,
        timeToShow: 12,
        timeToHide: 15,
        modalBackground: MainamatiBg,
        // modalComponent: <Modal3 />,
        hotSpotComponent: <HotSpot3 />
    },
    {
        id: 3,
        timeToShow: 18,
        timeToHide: 22,
        modalBackground: BandorbanBground,
        // modalComponent: <Modal4 />,
        hotSpotComponent: <HotSpot4 />
    }

]