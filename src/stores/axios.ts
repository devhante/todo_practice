import axios, { AxiosInstance } from 'axios';
import { action, observable } from "mobx";
import RootStore from "./root";

export default class AxiosStore {
    @observable public instance: AxiosInstance;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public create = () => {
        this.rootStore.axiosStore.instance = axios.create({
            baseURL: 'https://practice.alpaca.kr/api/',
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken')}
        });
    }
}