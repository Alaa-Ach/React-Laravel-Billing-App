import { Button, Modal } from "flowbite-react";
import {
    createContext,
    forwardRef,
    useContext,
    useImperativeHandle,
    useState,
} from "react";
const ModalContext = createContext({ closeModal: () => {} });

const ModalComponent = forwardRef(
    ({ name = null, onOpenModal = null, children }, ref) => {
        const [showModal, setShowModal] = useState(false);
        const openModal = () => {
            setShowModal(true);
        };
        const closeModal = () => {
            setShowModal(false);
        };
        useImperativeHandle(ref, () => ({
            openModal: () => {
                openModal();
            },
            closeModal: () => {
                closeModal();
            },
        }));
        return (
            <ModalContext.Provider value={{ closeModal }}>
                {name && (
                    <Button
                        onClick={() => {
                            openModal();
                            if (onOpenModal) onOpenModal();
                        }}
                    >
                        {name}
                    </Button>
                )}

                <Modal
                    size="4xl"
                    className="h-full"
                    show={showModal}
                    onClose={() => {
                        closeModal();
                    }}
                >
                    {children}
                </Modal>
            </ModalContext.Provider>
        );
    }
);

// Modal Header
const ModalHeader = ({ children }) => {
    return <Modal.Header>{children}</Modal.Header>;
};

// Modal Body
const ModalBody = ({ children }) => {
    return <Modal.Body>{children}</Modal.Body>;
};

// Modal Body
const ModalButtons = ({ children }) => {
    const { closeModal } = useContext(ModalContext);

    return (
        <Modal.Footer>
            {children}
            <Button color="gray" onClick={closeModal}>
                Annuler
            </Button>
        </Modal.Footer>
    );
};

// Export components
ModalComponent.Header = ModalHeader;
ModalComponent.Body = ModalBody;
ModalComponent.Buttons = ModalButtons;
export default ModalComponent;
