function loadKakaoSDK() {
  const script = document.createElement("script");
  script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
  script.integrity = import.meta.env.VITE_KAKAO_API_INTEGRITY;
  script.crossOrigin = "anonymous";
  script.onload = () => {
    window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
  };
  script.onerror = () => {
    console.error("Failed to load Kakao SDK");
  };
  document.head.appendChild(script);
}

loadKakaoSDK();
