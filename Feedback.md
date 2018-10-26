# 1.
모든 입력폼에서 폼 제출을 event.keyCode 로 엔터를 확인하거나 버튼 onClick 으로 확인하는데, 그렇게 하면 모든 키 입력마다 keyCode 가 13인지 확인하게 되어 좋지않음.

```
<form onSubmit={this.onSubmit}>
    <input …/>
    <button type=“submit”>확인</button>
</form>

private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 제출 시 실행할 코드들
}
```

위 코드와 같이 form 태그로 input 필드와 button 을 감싸고, button 에 type=“submit” 을 추가해주고 form 태그에 onSubmit prop 으로 폼 제출 시 함수를 실행할 수 있음. 그럼 엔터나 버튼클릭 등 입력폼을 제출하는 이벤트를 알아서 브라우져가 캐치해서 이벤트 처리를 해줌.

# 2.
Store 들을 잘 구성했음. Provider 로 모든 store 넘긴 후 inject 로 필요한 store 만 컴포넌트에서 받아서 사용하고 있음. 이런 구성보다

```
class RootStore {
    public userStore: UserStore;
    public appStore: AppStore;
    …
    consturctor() {
        this.userStore = new UserStore(rootStore);
        this.appStore = new AppStore(rootStore);
         …
    }
}
```

위와 같이 RootStore 를 만들고 이 RootStore 가 모든 store 들을 멤버로 갖게 만들면 Provider 로 루트스토어 하나만 넘기면 되고, inject 할 때도 루트스토어 하나만 inject 하면 되며, 컴포넌트에서 쓸때는 this.props.rootStore.userStore 처럼 쓰면 됨. 이렇게 코드를 짜면 생각하는게 단순해지고 코드도 깔끔해짐. 또한 store 를 가져다쓰는 컴포넌트의 Props interface 를 정의할 때에도,

```
Interface IInjectRootStoreProps {
    rootStore?: RootStore
}
```

이렇게 만들어두고 모든 inject 가 필요한 component 에서 불러다쓸수있음.

# 3.
axios로 http 요청보낼 때 모든 요청의 header 에 token 을 넣기위해 요청시 매번 header 설정을 하는데, 이것보다 axios instance 를 하나 만들고, 로그인하면 이 instance 에다가 header 설정을 한 번 해주고, rootStore 에 넣어놓으면 이후 모든 요청 시 inject 하고, this.props.rootStore.axios.get or post 처럼 이 instance 를 불러다가 따로 header 설정 없이 요청해도 돼서 편함.

# 4.
날짜 처리시, substring 으로 하지말고 javascript date object 의 method 를 사용할 것!

```
const now = new Date(); // 현재 시간
console.log(now.getFullYear()) // 2018
```

api 에서 오는 string 도 바로 date object 로 변환 가능 함.

```
const createdAt = new Date(todo.createdAt);
```

# 5.
render 에서 반복문이 들어가는 경우 반드시 key 를 넣어줘야함. 지금 짠 코드를 console 에서 보면 “Each child in an array or iterator should have a unique “key” prop. 이라는 오류 log 가 있을거임. TodoList 의 render 에서 TodoCard 에 key={item.id} 를 넣으면 에러가 사라짐. 이거 중요함! React 자체 내에서 performance 를 향상하기 위해 필요한 부분임.