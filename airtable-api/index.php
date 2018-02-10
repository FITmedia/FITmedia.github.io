<?php
include 'settings.php';
$base = 'appGFseBpeMuidZqL';
$table = 'survey';
$airtable_url = 'https://api.airtable.com/v0/' . $base . '/' . $table;
$url = 'https://api.airtable.com/v0/' . $base . '/' . $table . '?maxRecords=10&view=Main%20View';
$headers = array(
	'Authorization: Bearer ' . $api_key
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_URL, $url);
$entries = curl_exec($ch);
curl_close($ch);
$airtable_response = json_decode($entries, TRUE);

foreach($airtable_response['records'] as $key => $record)
	{
	$string.= $record['fields']['Data'] . ', ';
	$labels.= '"' . $record['fields']['Label'] . '", ';
}
$data = trim($string, ",");
$labels = trim($labels, ",");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Airtable API Magic</title>
    <meta content="Draw chart from Airtable using Chart.js" name="description">
    <meta content="Ben Gardner" name="author">
    <link href=
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css"
    rel="stylesheet"><!--<link rel="stylesheet" href="style.css" />-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel=
    "stylesheet">
    <script src="https://code.jquery.com/jquery-2.1.4.min.js">
    </script>
    <script src=
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js">
    </script>
    <script src=
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.bundle.min.js"
    type="text/javascript">
    </script><!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col m8 offset-m2 s12" style="margin-top: 100px;">
                <div class="airtable">
                    <h2>Airtable + Chart.js</h2>
                    <p>Fetch data from Airtable using their API and draw a
                    chart using <a href=
                    "http://www.chartjs.org/">chart.js</a></p>
                    <h3>Survey Results</h3>
                    <p>The internet's favorite animal.</p>
                    <canvas height="400" id="myChart" width="400"></canvas>
                    <script>
                    var ctx = document.getElementById("myChart");
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: [<?php echo $labels; ?>],
                            datasets: [{
                                label: '# of Votes',
                                data: [<?php echo $data; ?>],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });
                    </script>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col m8 offset-m2 s12">
                <p>Here's what the corresponding Airtable looks like:</p>
                <iframe class="airtable-embed" frameborder="0" height="533"
                onmousewheel="" src=
                "https://airtable.com/embed/shrpbS4Cvnqi79gsC?backgroundColor=purple"
                style="background: transparent; border: 1px solid #ccc;" width=
                "100%"></iframe>
            </div>
        </div>
    </div><!--<script src="scripts.js"></script>-->
</body>
</html>