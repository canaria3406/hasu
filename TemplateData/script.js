const dialogProps = {
    confirmButtonColor: "#F77392",
    color: "#645157",
    width: 650,
};

const post_sns_internal = (title, rawText, image, url) => {
    const copyImage = (image) => {
        const blob = toBlob(image);
        const item = new ClipboardItem({[blob.type]: blob});
        navigator.clipboard.write([item]);
    }
    
    const shareX = (_, text, image) => {
        Swal.fire({
            ...dialogProps,
            title: "◆スコアをシェア！◆",
            html: "この画面に表示されている画像を保存して、みんなにシェアしよう！<br />下のボタンをタップで、Xに直接投稿することもできるよ！<br />（スコアの画像はクリップボードにコピーされます）",
            imageUrl: image,
            imageHeight: 600,
            imageAlt: "スコア画像",
            confirmButtonText: "X でシェアする！",
        }).then(result => {
            if (result.isConfirmed) {
                copyImage(image);
                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                window.open(shareUrl, "_blank");
            }
        });
    };
    
    const share = (title, text, image) => {
        const blob = toBlob(image);
        const imageFile = new File([blob], "image.png", { type: "image/png" });
        navigator.share({title, text, files: [imageFile] });
    };
    
    const toBlob = (base64) => {
        const decodedData = atob(base64.replace(/^.*,/, ""));
        const buffers = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            buffers[i] = decodedData.charCodeAt(i);
        }
        return new Blob([buffers.buffer], { type: "image/png" });
    };
    
    const text = `${rawText}\n\n${url}`;
    const isIPad = /iPad|Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document
    const isIphone = /iPhone/i.test(navigator.userAgent) && 'ontouchend' in document
    if (isIPad || isIphone) {
        share(title, text, image);
    } else {
        shareX(title, text, image);
    }
};

const copy_clipboard_internal = (str) => {
    Swal.fire({
        ...dialogProps,
        text: "クリップボードにコピーしました！",
    }).then(() => {
        navigator.clipboard.writeText(str);
    });
};

const open_url_internal = (url) => {
    Swal.fire({
        ...dialogProps,
        text: "シリアルコードの入力フォームを開きます",
    }).then(result => {
        if (result.isConfirmed) {
            window.open(url, "_blank");
        }
    });
};
