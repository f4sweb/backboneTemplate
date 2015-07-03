# -*- coding: utf-8 -*-
f = open("hoge.html", "w")
txt = ""
txt += "<!DOCTYPE html>¥n"
txt += "<html lang='ja'>¥n"
txt += "<head>"
txt += "	<meta charset='utf-8'>"
txt += "	<title>SimpleView</title>"
txt += "	<link rel='stylesheet' href='_css/common.css'>"
txt += "</head>"
txt += "<body>"
txt += "	<h1>backboneTemplate</h1>"
txt += "	<a href='01_simpleView/index.html'>01_simpleView</a>"
txt += "</body>"
txt += "</html>"
f.write(txt)