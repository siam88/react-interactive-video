import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'
import HotSpot5 from '../components/hotSpot/hotSpot5'
import HotSpot6 from '../components/hotSpot/hotSpot6'
import HotSpot7 from '../components/hotSpot/hotSpot7'
import Modal1 from '../components/modals'


export let eventSchedules = [
    {
        id: 1,
        timeToShow: 5,
        timeToHide: 8,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot1 />
    },
    {
        id: 2,
        timeToShow: 10,
        timeToHide: 15,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot2 />
    },
    {
        id: 3,
        timeToShow: 17,
        timeToHide: 20,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot3 />
    },
    {
        id: 4,
        timeToShow: 22,
        timeToHide: 26,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot4 />
    },
    {
        id: 5,
        timeToShow: 28,
        timeToHide: 30,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot5 />
    },
    {
        id: 6,
        timeToShow: 33,
        timeToHide: 38,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot6 />
    },
    {
        id: 7,
        timeToShow: 41,
        timeToHide: 49,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot7 />
    }
]