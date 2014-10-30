define('net/HHAdapter',
    [
        'net/FileUploader'
    ],
    function(FileUploader) {

        return {

            getResumeByURL: function(url) {
                return FileUploader.buildFileFromUri(url, 'resume.rtf', 'msword');
            }
        }
    });