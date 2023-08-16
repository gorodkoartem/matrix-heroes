export class UiState {
    constructor(public processing: boolean, public message: string) {
    }
}

export const initialUiState: UiState = {
    processing: false,
    message: ''
};