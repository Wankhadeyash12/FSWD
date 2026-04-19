$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("c:\Users\wankh\OneDrive\Desktop\E-Commerse\Ecommerce_Project_Documentation.docx")
$text = $doc.Content.Text
$text | Out-File -FilePath "c:\Users\wankh\OneDrive\Desktop\E-Commerse\doc_content.txt" -Encoding UTF8
$doc.Close()
$word.Quit()
