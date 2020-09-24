function serializeToJson(form) {
    //创建一个空对象去接受数值转化后的对象
    var result = {};

    //获取表单的值,返回一个[{name:'email',value:'xxx'}]
    var f = form.serializeArray();

    // 将[{}] 转化为{};
    // 对数组进行遍历
    f.forEach(function(item) {
        //对result这个对象赋值,这里item是一个对象,item.name就是email
        result[item.name] = item.value; //属性名=属性值 就可以直接给创建属性名
    });
    return result;
}