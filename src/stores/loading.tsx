import { action, observable } from "mobx";

export default class LoadingStore {
    @observable public loadingSwitch = true;
    @observable public isLoading = false;

    @action
    public allowLoading = () => {
        this.loadingSwitch = true;
    }

    @action
    public disallowLoading = () => {
        this.loadingSwitch = false;
    }

    @action
    public startLoading = () => {
        if(this.loadingSwitch) {
            this.isLoading = true;
        }    
    }

    @action
    public endLoading = () => {
        this.isLoading = false;
    }
}