#include "Lighting.glsl";
#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了
	precision highp float;
#else
	precision mediump float;
#endif
attribute vec4 a_PositionTexcoord;
varying vec2 v_Texcoord0;

void main() {
	gl_Position = vec4(a_PositionTexcoord.xy, 0.0, 1.0);
	v_Texcoord0 = a_PositionTexcoord.zw;
	gl_Position = remapGLPositionZ(gl_Position);
}