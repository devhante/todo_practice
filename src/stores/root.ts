import AppStore from "./app";
import LoadingStore from "./loading";
import SearchStore from "./search";
import TodoStore from "./todo";
import UserStore from "./user";

export default class RootStore {
    public appStore: AppStore;
    public loadingStore: LoadingStore;
    public searchStore: SearchStore;
    public todoStore: TodoStore;
    public userStore: UserStore;
    
    constructor() {
        this.appStore = new AppStore(this);
        this.loadingStore = new LoadingStore(this);
        this.searchStore = new SearchStore(this);
        this.todoStore = new TodoStore(this);
        this.userStore = new UserStore(this);
    }
}