# -*- coding: UTF-8 -*-

# 比较两个表格是否相同
def compareExcel(sheet1, sheet2):
    row1 = sheet1.max_row
    col1 = sheet1.max_column
    row2 = sheet2.max_row
    col2 = sheet2.max_column
    if row1 != row2 or col1 != col2:
        return False
    for i in range(1, row1 + 1):
        for j in range(1, col1 + 1):
            cell1 = sheet1.cell(i, j).value
            cell2 = sheet2.cell(i, j).value
            if cell1 != cell2:
                return False
    return True