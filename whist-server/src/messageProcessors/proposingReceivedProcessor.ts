import { CardSuits } from '../gameRoutine/types';
import { SuitProposal } from '../votingRoutine/types';
import { PROPOSAL_PLACED } from '../webSocketServer/messages/messageTypes';
import { Message } from '../webSocketServer/types';

const proposingReceivedProcessor = (message: Message): SuitProposal => {
    if (message || message.type !== PROPOSAL_PLACED || !message.data || !message.sender) {
        //error
        return;
    }

    const { number, suit } = message.data as { number: number, suit: CardSuits };

    if (!number || !suit) {
        //error
        return;
    }

    return {
        player: message.sender,
        number,
        suit
    };
};

export default proposingReceivedProcessor;
