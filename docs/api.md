# API 요청 및 응답 예시

## 지금 어디가 메인 페이지

### 교통수단 리스트 반환

- 요청 예시

```js
undefined
```

- 응답 예시

```json
{
    "data" : [
        { 
            "id": 1, 
            "transportation": "🚃 지하철" //아이콘도 같이 넣어주세요
        }, 
        { 
            "id": 2, 
            "transportation": "🚌 버스"
        },
        // ...
    ] 
}
```

### 지역 리스트 반환

- 요청 예시

```js
undefined
```

- 응답 예시

```json
{
    "data" : [
        { 
            "id": 1, 
            "region": "서울" 
        },
        { 
            "id": 2, 
            "region": "경기 북부" 
        },
        // ...
    ]
}
```

### 게시글 최신순 리스트 반환

- 요청 예시

```json
{
    "start": 1,
    "region": "서울", // optional, 비어있다면 모든 지역에 대해 반환 -> 아이디로 요청을 받고 싶으시면 수정해주세요
    "transportation": "bus", // optional, 비어있다면 모든 교통 수단에 대해 반환  -> 아이디로 요청을 받고 싶으시면 수정해주세요

}
```

- 응답 예시

```json
{
    "data": [
        {
            "id": "게시글 id",
            "createdAt": "게시 날짜 및 시간",
            "text": "글 내용",
            "image": "image base64 문자열", // optional
            "emoticon": "like",
            "region": "서울",
            "trasportation": "🚌 버스",
            "likeCount": 3
        },
        {
            "id": "게시글 id",
            "createdAt": "게시 날짜 및 시간",
            "text": "글 내용",
            "image": "image base64 문자열",
            "emoticon": "dislike",
            "region": "경기 북부",
            "trasportation": "🚌 버스",
            "likeCount": 1
        },
        // ...
    ]
}
```

### 게시글 공감순 리스트 반환 

- 요청 예시

```json
{
    "start": 1,
    "region": "서울", // optional, 비어있다면 모든 지역에 대해 반환  -> 아이디로 요청을 받고 싶으시면 수정해주세요
    "transportation": "bus", // optional, 비어있다면 모든 교통 수단에 대해 반환  -> 아이디로 요청을 받고 싶으시면 수정해주세요

}
```

- 응답 예시

```json
{
    "data": [
        {
            "id": "게시글 id",
            "createdAt": "게시 날짜 및 시간",
            "text": "글 내용",
            "image": "image base64 문자열", // optional
            "emoticon": "like",
            "region": "서울",
            "trasportation": "🚌 버스",
            "likeCount": 3
        },
        {
            "id": "게시글 id",
            "createdAt": "게시 날짜 및 시간",
            "text": "글 내용",
            "image": "image base64 문자열",
            "emoticon": "dislike",
            "region": "경기 북부",
            "trasportation": "🚌 버스",
            "likeCount": 1
        },
        // ...
    ]
}
```

### 좋아요 요청

- 요청 예시

```json
{
    "id": "게시글 id"
}
```
- 응답 예시

```json
true
```

### 좋아요 취소

- 요청 예시

```json
{
    "id": "게시글 id"
}
```

- 응답 예시

```json
true
```

### 신고 요청

- 요청 예시

```json
{
    "id": "게시글 id",
    "신고 사유": "신고 사유에 해당하는 id",
    "디테일 신고 사유": null
}
```

혹은

```json
{
    "id": "게시글 id",
    "신고 사유": "신고 사유에 해당하는 id",
    "디테일 신고 사유": "버스 내부가 너무 더워요"
}
```

- 응답 예시

```
true
```

### 신고 사유 요청

- 요청 예시

```js
undefined
```

- 응답 예시

```json
{
    "data": [
        { 
            "id": 1, 
            "reportReason": "욕설이나 비속어" 
        },
        { 
            "id": 2, 
            "reportReason": "스팸메세지나 광고성 메세지" 
        },
        // ...
    ] //와이어프레임에 써져있는 순서대로 응답에 보내주세요. 욕설/스팸/혐오/선정/기타 순
}
```

### 감정 이모티콘 종류 요청

- 요청 예시
```js
undefined
```
- 응답 예시

```json
{
    "data": [
        { 
            "id":1, 
            "emoticon": "like" // emotion은 감정 이모티콘 이름입니다. 영어로 작성 부탁드려요~
        }, 
        { 
            "id":2, 
            "emoticon": "dislike"
        },  
    ] 
    // ...
}
```
### 글 작성
- 요청 예시

```json
{
    "text": "글 내용",
    "image": "image base64 문자열", // optional
    "emoticon": "like",
    "region": "서울",
    "trasportation": "🚌 버스"
}
```

- 응답 예시

```json
{
    "id": "게시글 id",
    "createdAt": "게시 날짜 및 시간",
    "text": "글 내용",
    "image": "image base64 문자열", // optional
    "emoticon": "like",
    "region": "서울",
    "trasportation": "🚌 버스",
    "likeCount": 0
}
```
