import { config, history } from 'ice';
import { Message as AMessage } from '@alifd/next';

function timeout() {
  history?.replace('/login');
}

// 处理http错误
function handleHttpError({ response }) {
  let errorMsg;
  const { status } = response;
  const responseData = response.data.ResponseStatus;

  if (status >= 500) {
    errorMsg = (responseData && responseData.Message) || '服务器异常';
  } else if (status === 401) {
    timeout();
    return false;
  } else if (status >= 300) {
    // http 请求超时
    const statusMap = {
      404: '请求地址不存在',
      408: '请求超时，请重试！',
      401: '授权失败！',
    };

    errorMsg = statusMap[status] || '请求错误！';
  }
  return errorMsg;
}

export default {
  baseURL: config.baseURL,
  // 拦截器
  interceptors: {
    request: {
      onConfig: (requestConfig) => {
        // eslint-disable-next-line no-param-reassign
        requestConfig.headers = { Authorization: window.sessionStorage.getItem('atoken') };
        return requestConfig;
      },
      onError: (error) => {
        return Promise.reject(error);
      },
    },
    response: {
      onConfig: (response) => {
        const {
          data,
          config: resConfig,
        } = response;

        const { ResponseStatus } = data;

        if (!ResponseStatus) {
          return response;
        }

        const { ErrorCode, Message } = ResponseStatus;

        if (Number(ErrorCode) === 0) {
          return response;
        }

        // @ts-ignore
        const { errorCodeIgnore } = resConfig;
        if (
          errorCodeIgnore !== true
            && !(
              Array.isArray(errorCodeIgnore)
                && errorCodeIgnore.includes(ErrorCode)
            )
        ) {
          AMessage.error(`${Message}(${ErrorCode})`);
        }

        return response;
      },
      onError: (error) => {
        const { code, response, message } = error;

        let errorMsg;

        if (response) {
          errorMsg = handleHttpError(error);
        } else if (code === 'ECONNABORTED') {
          errorMsg = '请求超时，请重试！';
        } else {
          const errorMap = {
            'Network Error': '网络异常，请查看网络设置！',
          };
          errorMsg = errorMap[message] || message;
        }

        errorMsg && AMessage.error(errorMsg);

        return Promise.reject(error);
      },
    },
  },
};
