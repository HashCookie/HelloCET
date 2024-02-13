function ContactForm() {
  return (
    <div className="grid px-10 sm:grid-cols-2 items-center gap-16 my-16 mx-auto max-w-4xl bg-white text-[#333] font-[sans-serif]">
      <div>
        <h1 className="text-3xl font-extrabold">联系我</h1>
        <p className="text-sm text-gray-400 mt-3">
          感谢您对我们项目的关注。请知悉，目前平台上的所有资料均为我个人上传。虽然我努力确保内容的准确与格式的规范，但可能仍有不足之处。若您发现任何错误或格式问题，请随时联系我反馈。您的意见对我们至关重要，有助于我们不断改进。
        </p>
        <p className="text-sm text-gray-400 mt-3">
          另外，如果您热衷于开源并愿意贡献力量，欢迎fork本项目。众人拾柴火焰高，您的加入能使我们的项目更完善，更好地服务社区。
        </p>
      </div>
      <form className="ml-auo space-y-4">
        <div className="mt-12">
          <h2 className="text-lg font-extrabold">Email</h2>
          <ul className="mt-3">
            <li className="flex items-center">
              <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="#007bff"
                  viewBox="0 0 479.058 479.058"
                >
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000"
                  />
                </svg>
              </div>
              <a
                className="text-[#007bff] text-sm ml-3"
                href="mailto:HashCookie404@gmail.com"
              >
                <small className="block">Mail</small>
                <strong>HashCookie404@gmail.com</strong>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12">
          <h2 className="text-lg font-extrabold">Socials</h2>
          <ul className="flex mt-3 space-x-4">
            <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="https://github.com/HashCookie/LanguageLadder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0,0,256,256"
                  width="40px"
                  height="40px"
                >
                  <g
                    fill="#6296f4"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="translate(-0.01496,-1.51906) scale(8.53333,8.53333)">
                      <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path>
                    </g>
                  </g>
                </svg>
              </a>
            </li>
            <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="https://twitter.com/Hashcookie404">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0,0,256,256"
                  width="40px"
                  height="40px"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(5.33333,5.33333)">
                      <path
                        d="M24,4c-11.04569,0 -20,8.95431 -20,20c0,11.04569 8.95431,20 20,20c11.04569,0 20,-8.95431 20,-20c0,-11.04569 -8.95431,-20 -20,-20z"
                        fill="#6296f4"
                      ></path>
                      <path
                        d="M36,17.12c-0.882,0.391 -1.999,0.758 -3,0.88c1.018,-0.604 2.633,-1.862 3,-3c-0.951,0.559 -2.671,1.156 -3.793,1.372c-0.896,-0.95 -2.174,-1.372 -3.59,-1.372c-2.72,0 -4.617,2.305 -4.617,5v2c-4,0 -7.9,-3.047 -10.327,-6c-0.427,0.721 -0.667,1.565 -0.667,2.457c0,1.819 1.671,3.665 2.994,4.543c-0.807,-0.025 -2.335,-0.641 -3,-1c0,0.016 0,0.036 0,0.057c0,2.367 1.661,3.974 3.912,4.422c-0.411,0.113 -0.912,0.521 -2.84,0.521c0.626,1.935 3.773,2.958 5.928,3c-1.686,1.307 -4.692,2 -7,2c-0.399,0 -0.615,0.022 -1,-0.023c2.178,1.38 5.22,2.023 8,2.023c9.057,0 14,-6.918 14,-13.37c0,-0.212 -0.007,-0.922 -0.018,-1.13c0.968,-0.682 1.36,-1.396 2.018,-2.38"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
