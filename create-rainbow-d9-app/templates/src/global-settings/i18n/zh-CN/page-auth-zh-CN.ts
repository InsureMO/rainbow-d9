export const intlForPageAuthZhCN = {
	authentication: {
		title: '欢迎',
		username: {placeholder: '用户名', required: '请填写用户名.'},
		pwd: {placeholder: '密码', required: '请填写密码.'},
		'username-pwd': {required: '请填写用户名和密码.'},
		code2fa: {placeholder: '验证码', required: '请填写验证码.'},
		failed: '认证失败, 请检查用户名和密码是否正确.',
		failed2fa: '认证失败, 请检查验证码是否正确.',
		'no-auth-enabled': '未启用登录页, 修改/src/work-area/unauthenticated/no-authentication.tsx实现自定义SSO.'
	}
};
