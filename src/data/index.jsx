import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'
import HotSpot5 from '../components/hotSpot/hotSpot5'
import HotSpot6 from '../components/hotSpot/hotSpot6'
import HotSpot7 from '../components/hotSpot/hotSpot7'
import Modal1 from '../components/modals/modal1'
import Modal2 from '../components/modals/modal2'
import Modal3 from '../components/modals/modal3'
import Modal4 from '../components/modals/modal4'
import Modal5 from '../components/modals/modal5'
import Modal6 from '../components/modals/modal6'
import Modal7 from '../components/modals/modal7'
import ModalBackground1 from '../assets/images/modalBackground1.jpeg'

export let eventSchedules = [
    {
        id: 0,
        timeToShow: 2,
        timeToHide: 5,
        modalBackground: ModalBackground1,
        modalComponent: <Modal1 />,
        hotSpotComponent: <HotSpot1 />
    },
    {
        id: 1,
        timeToShow: 6,
        timeToHide: 10,
        modalBackground: ModalBackground1,
        modalComponent: <Modal2 />,
        hotSpotComponent: <HotSpot2 />
    },
    {
        id: 2,
        timeToShow: 12,
        timeToHide: 15,
        modalBackground: ModalBackground1,
        modalComponent: <Modal3 />,
        hotSpotComponent: <HotSpot3 />
    },
    {
        id: 3,
        timeToShow: 18,
        timeToHide: 22,
        modalBackground: ModalBackground1,
        modalComponent: <Modal4 />,
        hotSpotComponent: <HotSpot4 />
    },
    {
        id: 4,
        timeToShow: 24,
        timeToHide: 27,
        modalBackground: ModalBackground1,
        modalComponent: <Modal5 />,
        hotSpotComponent: <HotSpot5 />
    },
    {
        id: 5,
        timeToShow: 28,
        timeToHide: 30,
        modalBackground: ModalBackground1,
        modalComponent: <Modal6 />,
        hotSpotComponent: <HotSpot6 />
    },
    {
        id: 6,
        timeToShow: 31,
        timeToHide: 33,
        modalBackground: ModalBackground1,
        modalComponent: <Modal7 />,
        hotSpotComponent: <HotSpot7 />
    },

]