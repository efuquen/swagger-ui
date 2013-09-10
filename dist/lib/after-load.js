function  setupSwaggerSTS() {
//(function () {
    var useToken = function(token, tokenstate) {
        $("#input_apiKey").val(token)
        $('input[name=GI-Security-Token]').val(token);
        // var tokenData = { Secure: false, Authenticated: false, Token: token };
        // tokenData.Secure = tokenstate == 'user-secure';
        // tokenData.Authenticated = tokenstate != 'anonymous';
        // $(document).trigger('gi:tokenPopulated', tokenData);
    };

    var alertTokenError = function(errorMessage) {
        console.log(errorMessage);
        alert('Error getting token: ' + errorMessage);
    };

    
    $('#resources_container').before('<div id="gi_head_container"></div>')
    $('#gi_head_container')
        .append('<label>System Id: <input id="gi_system_id" type="text" value="100" /></label><button id="submit_gi_system_id">System Token</button>')
        .append('<label>Username: <input id="gi_username" type="text" value="qaterms" /></label><button id="submit_gi_user_token">User Token</button>');
    
    $('#submit_gi_system_id').click(function() {
        var systemId = $('#gi_system_id').val();
        $.ajax('/schema/systemtoken/' + systemId, {
            success: function(token) {
                useToken(token,'anonymous');
            },
            error: function(xhr) {
                alertTokenError(xhr.responseText);
            }
        });
    });
    $('#submit_gi_user_token').click(function () {
        var systemId = $('#gi_system_id').val();
        var username = $('#gi_username').val();
        $.ajax('/schema/usertoken/' + systemId + '/' + encodeURIComponent(username), {
            success: function(token) {
                // var token = jQuery.parseJSON(response);
                // useToken(token.GetUserTokenResponseBody.NonSecureToken,'user');
                useToken(token,'user');

            },
            error: function(xhr) {
                alertTokenError(xhr.responseText);
            }
        });
    });
    if (window.swaggerApi) {
        $('input[name=GI-Major-Version]').val(swaggerApi.apiVersion.split('.')[0]);
        $('input[name=GI-Minor-Version]').val(swaggerApi.apiVersion.split('.')[1]);
    }
}

function setMockAssetData(){  
    $.get('/schema/mock/asset', function(data) {  
        var jsonData = JSON.parse(data);  
        var str = JSON.stringify(jsonData, undefined, 1);  
        $("textarea").each(function(){  
            if(this.value == "#AssetModel"){  
                this.value = str;  
                $(this).height(1024);  
                return;  
            }  
        });  
    });  
}
