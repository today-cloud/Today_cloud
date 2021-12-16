 const mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
  level: 3 // 지도의 확대 레벨
};

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'idle', function() {
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

  function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

  function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
  var infoDiv = document.getElementById('centerAddr');

  for(var i = 0; i < result.length; i++) {
  // 행정동의 region_type 값은 'H' 이므로
  if (result[i].region_type === 'H') {
  infoDiv.innerHTML = result[i].address_name;
  break;
}
}
}
}

  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);

  // 중심좌표 위치 변경
  function displayMarker(locPosition) {
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

  // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  if (navigator.geolocation) {
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도
    let locPosition = new kakao.maps.LatLng(lat, lon); // geolocation으로 얻어온 좌표로 생성합니다
    // 현재 위치를 가져옵니다
    displayMarker(locPosition);
  });
} else { // HTML5의 GeoLocation을 사용할 수 없을때 중심좌표로 기본 설정
  let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  displayMarker(locPosition, message);
};
