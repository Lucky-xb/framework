# -*- coding: UTF-8 -*-
import sys
import os

reload(sys)
sys.setdefaultencoding('utf-8')

rootPath = "../../src/view/"
def autoCode():
    desc = '请输入文件名（用小写）：'
    name = raw_input(desc.encode('gb18030'))
    arr = [name]

    # 创建文件夹
    ctrlPath = rootPath + name + "/controller/"
    modelPath = rootPath + name + "/model/"
    viewPath = rootPath + name + "/view/"
    createFile(ctrlPath)
    createFile(modelPath)
    createFile(viewPath)

    names = map(lambda x: x.capitalize(), arr)
    ctrlName = "%sController" % names[0]
    modelName = "%sModel" % names[0]
    viewName = "%sView" % names[0]

    # 创建文件并写入文件
    writeToFile(ctrlPath, ctrlName)
    writeToFile(modelPath, modelName)
    writeToFile(viewPath, viewName)

    printCN('创建成功！')

def createFile(path):
    isExist = os.path.exists(path)
    if not isExist:
        os.makedirs(path)

def writeToFile(path, fileName):
    url = path + fileName + '.ts'
    data = 'export class %s {\n\n}' % fileName
    with open(url, 'w') as f:
        f.write(data)

def printCN(desc):
    print(desc.encode('gb18030'))


if __name__ == '__main__':
    autoCode()