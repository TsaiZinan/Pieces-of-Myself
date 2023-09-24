# 导出 Youtube Music 喜欢歌曲列表
## 2023 09 24

## 前言
因为回国之后没法用 Youtube Music 了，所以决定把这几年在上面所有喜欢的歌曲导出来，到时候好导入国内能用的 Apple Music 里。以为点点网页就行，没想到还是有点复杂，遂记录下来。

## 第一步 - 保存列表

默认 Liked Music 这个播放列表是没法导出的，我需要在这个列表的页面里，勾选第一首歌，滚轮滚啊滚滚到最下面，shift的同时勾选最后一首歌，再保存进一个新的播放列表以供后续导出。

注意：我的列表显示一共有916首，但实际只显示739首，感觉是一个BUG，估计把一些下架消失的也统计进去了。

## 第二步 - 导出

Google的导出数据要Google Takeout里操作，选择YouTube and YouTube Music选项里的playlist。当Google把数据准备好后会通过邮件把下载链接发过来。

## 第三步 - 下载打开文件

在下载下来的playlists文件夹里通过名字找着对应的一个CSV文件。打开它之后会发现Google非常鸡贼，整个文件的格式是这样的：

```
Video ID,Playlist video creation timestamp
dqfLH0opCPk,2023-09-22T16:39:00+00:00
PfGjIitSVBA,2023-09-22T16:39:00+00:00
wXSudJ1utVU,2023-09-22T16:39:00+00:00
```

它不会给你任何歌曲信息，就甩一个歌曲的Youtube视频ID后缀给你。因此我只能求助GPT写一个python程序把ID转换成歌曲名和歌手名。

## 第四步 - 转换信息

跟GPT拉扯几回之后我得到了这个程序：

```
import csv
import requests

def get_video_info(api_key, video_id):
    base_url = "https://www.googleapis.com/youtube/v3/videos"
    params = {
        "id": video_id,
        "key": api_key,
        "part": "snippet"
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if "items" not in data or not data["items"]:
        print(f"Error or no data received for video ID: {video_id}")
        if "error" in data:
            print(data["error"]["message"])
        return None, None

    title = data['items'][0]['snippet']['title']
    uploader = data['items'][0]['snippet']['channelTitle']
    
    return title, uploader

def process_csv(input_file, output_file, api_key):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        # Write header to output
        header = next(reader)
        writer.writerow(header + ["Title", "Uploader"])

        line_number = 1  # Start from 1 to account for the header
        for row in reader:
            line_number += 1
            print(f"Processing line {line_number}...")

            video_id = row[0]
            title, uploader = get_video_info(api_key, video_id)
            
            # If title or uploader is None, skip this row and continue with the next one
            if title is None or uploader is None:
                print(f"Skipping video ID: {video_id} at line {line_number} due to error.")
                continue

            writer.writerow(row + [title, uploader])

if __name__ == "__main__":
    api_key = "API_KEY"
    input_file = "input.csv"
    output_file = "output.csv"
    process_csv(input_file, output_file, api_key)
```

程序最后部分API_KEY需要替换为去 https://www.googleapis.com/youtube/v3/videos 申请的API，input.csv要改成你的播放列表文件名。

在Anaconda里运行：

```
conda create -n myenv python=3.8
conda activate myenv
pip install requests
python youtube_processor.py
```

最终输出的文件是这样的：

```
Video ID,Playlist video creation timestamp,Title,Uploader
dqfLH0opCPk,2023-09-22T16:39:00+00:00,Aqua（Instrumental）,Ryuichi Sakamoto - Topic
PfGjIitSVBA,2023-09-22T16:39:00+00:00,Genkai-1,Biosphere - Topic
wXSudJ1utVU,2023-09-22T16:39:00+00:00,She Just Likes to Fight,Four Tet - Topic
csnryqUpO-g,2023-09-22T16:39:00+00:00,Kobresia,Biosphere - Topic
3qs9z24fPZc,2023-09-22T16:39:00+00:00,Oi-1,Biosphere - Topic
```

当然这个程序有个小BUG，会跳过搜不到的视频，使用的时候需要根据提示自己手动补全。

## 第五步 - 精简

接下来去除  - Topic 这个多余信息，去掉Playlist video creation timestamp这两列，调整下顺序，再转换成markdown的表格格式，最终才可以得到最终的歌曲表单。

由于表格大，打开有点慢，我放在一个单独的链接里：

> [YouTube Music Liked Music Playlist](https://tsaizinan.github.io/Pieces-of-Myself/#/static/media/20230925-[%E6%B5%81%E9%87%8F%E9%A2%84%E8%AD%A6]%20YouTube%20Music%20Liked%20Music%20Playlist.55b9c8b61e16947b30e6.md)