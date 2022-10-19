import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'



import MarineDriveBg from '../assets/all-images/overlay-bg-Cox_s Bazar.png'
import MainamatiBg from '../assets/all-images/overlay-bg-moynamoti.png'
import BandorbanBg from '../assets/all-images/overlay-bg-Bandarban.png'
import TamimBackground from '../assets/all-images/overlay-bg-Tamim.png'


export let eventSchedules = [
    {
        id: 0,
        timeToShow: 1,
        timeToHide: 4,
        modalBackground: MarineDriveBg,
        // modalComponent: <Modal1 />,
        hotSpotComponent: <HotSpot1 />
    },
    {
        id: 1,
        timeToShow: 8,
        timeToHide: 10,
        modalBackground: TamimBackground,
        // modalComponent: <Modal2 />,
        hotSpotComponent: <HotSpot2 />
    },
    {
        id: 2,
        timeToShow: 11,
        timeToHide: 14,
        modalBackground: MainamatiBg,
        // modalComponent: <Modal3 />,
        hotSpotComponent: <HotSpot3 />
    },
    {
        id: 3,
        timeToShow: 15,
        timeToHide: 19,
        modalBackground: BandorbanBg,
        // modalComponent: <Modal4 />,
        hotSpotComponent: <HotSpot4 />
    }

]